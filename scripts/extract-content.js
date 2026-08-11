#!/usr/bin/env node

/**
 * Script to extract content from research dossiers into structured article format
 * This is a more robust version of our article-production pipeline
 */

const fs = require('fs');
const path = require('path');

function readFileContent(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return '';
  }
}

function extractSection(content, sectionTitle) {
  // Create regex to match section by title, handling variations in section format
  const regex = new RegExp(`## ${sectionTitle}(.*?)(?=## |$)`, 's');
  const match = content.match(regex);
  return match ? match[1].trim() : '';
}

function processDossier(dossierPath) {
  try {
    const content = readFileContent(dossierPath);
    const filename = path.basename(dossierPath, '.md');
    
    console.log(`Processing ${filename}...`);
    
    // Simple extraction - we'll get the main content sections
    const titleMatch = content.match(/^# (.+)/m);
    const title = titleMatch ? titleMatch[1] : filename;
    
    // Extract key content areas using actual section names from research dossiers
    const overview = extractSection(content, 'Overview');
    const primarySources = extractSection(content, 'Primary Sources');
    const researchMethodology = extractSection(content, 'Research Methodology');
    const articleOutline = extractSection(content, 'Article Outline');
    const verificationPlan = extractSection(content, 'Verification Plan');
    const provenance = extractSection(content, 'Provenance');
    
    // Combine relevant content for main article sections
    const introduction = overview || researchMethodology || '';
    const mainContent = `${primarySources} ${articleOutline} ${researchMethodology}`.trim();
    const sources = primarySources || '';
    const conclusion = verificationPlan || provenance || '';
    
    // Create article structure with fallbacks
    const article = {
      title: title,
      introduction: introduction || 'No introduction section found.',
      mainContent: mainContent || 'No main content section found.', 
      sources: sources || 'No sources section found.',
      conclusion: conclusion || 'No conclusion section found.',
      date: new Date().toISOString(),
      status: 'draft',
      filename: filename
    };
    
    return article;
  } catch (error) {
    console.error(`Error processing ${dossierPath}:`, error);
    return null;
  }
}

function processAllDossiers() {
  const dossierFiles = [
    'research-dossier-germ-theory.md',
    'research-dossier-quantum-revolution.md', 
    'research-dossier-transatlantic-cable.md'
  ];
  
  const articles = [];
  
  dossierFiles.forEach(dossierFile => {
    const dossierPath = path.join(__dirname, '..', dossierFile);
    
    if (fs.existsSync(dossierPath)) {
      const article = processDossier(dossierPath);
      if (article) {
        articles.push(article);
      }
    } else {
      console.error(`Dossier file not found: ${dossierFile}`);
    }
  });
  
  // Save processed articles
  const outputDir = path.join(__dirname, '..', 'articles');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  articles.forEach((article, index) => {
    const outputPath = path.join(outputDir, `article-${index + 1}-${article.filename}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(article, null, 2));
    console.log(`Saved article: ${outputPath}`);
  });
  
  console.log('\nAll dossiers processed successfully!');
  return articles;
}

// Main execution
console.log('Starting article production pipeline...');
const results = processAllDossiers();

if (results.length > 0) {
  console.log(`\nProcessed ${results.length} articles from research dossiers.`);
  console.log('Files saved in the "articles" directory.');
} else {
  console.error('\nNo articles were processed successfully.');
}