#!/usr/bin/env node

/**
 * Script to process research dossiers into articles
 * This is the first step of our article-production pipeline
 */

const fs = require('fs');
const path = require('path');

// Read research dossier files
const dossierFiles = [
  'research-dossier-germ-theory.md',
  'research-dossier-quantum-revolution.md', 
  'research-dossier-transatlantic-cable.md'
];

function processDossier(dossierPath) {
  try {
    const content = fs.readFileSync(dossierPath, 'utf8');
    console.log(`Processing ${path.basename(dossierPath)}...`);
    
    // Extract key sections
    const sections = {
      title: content.match(/# (.+)/)?.[1] || 'Untitled',
      introduction: content.match(/## Introduction[\s\S]*?## /)?.[0] || '',
      mainContent: content.match(/## Main Content[\s\S]*?## /)?.[0] || '',
      sources: content.match(/## Sources[\s\S]*?## /)?.[0] || ''
    };
    
    // Create article stub
    const article = {
      title: sections.title,
      introduction: sections.introduction,
      mainContent: sections.mainContent,
      sources: sections.sources,
      date: new Date().toISOString(),
      status: 'draft'
    };
    
    return article;
  } catch (error) {
    console.error(`Error processing ${dossierPath}:`, error);
    return null;
  }
}

function processAllDossiers() {
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
    const outputPath = path.join(outputDir, `article-${index + 1}-${article.title.toLowerCase().replace(/\s+/g, '-')}.md`);
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
} else {
  console.error('\nNo articles were processed successfully.');
}