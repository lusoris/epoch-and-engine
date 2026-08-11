const fs = require('fs');
const path = require('path');

// Function to extract content sections from research dossier
function extractSection(content, sectionTitle) {
  const regex = new RegExp(`## ${sectionTitle}(.*?)(?=## |$)`, 's');
  const match = content.match(regex);
  return match ? match[1].trim() : '';
}

// Process a single research dossier
function processDossier(dossierPath, outputDir) {
  const content = fs.readFileSync(dossierPath, 'utf8');
  const filename = path.basename(dossierPath, '.md');
  
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
  
  // Create article object
  const article = {
    title: filename.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    introduction: introduction,
    mainContent: mainContent,
    sources: sources,
    conclusion: conclusion,
    date: new Date().toISOString(),
    slug: filename
  };
  
  // Write to JSON file
  const outputPath = path.join(outputDir, `${filename}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(article, null, 2));
  console.log(`Processed ${filename} and saved to ${outputPath}`);
}

// Main execution
const outputDir = 'articles';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Process each research dossier
const dossiers = [
  'research-dossier-germ-theory.md',
  'research-dossier-quantum-revolution.md', 
  'research-dossier-transatlantic-cable.md'
];

dossiers.forEach(dossier => {
  if (fs.existsSync(dossier)) {
    processDossier(dossier, outputDir);
  } else {
    console.log(`Warning: ${dossier} not found`);
  }
});

console.log('Article production pipeline completed successfully!');