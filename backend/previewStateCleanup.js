/**
 * Preview Script - Shows what changes will be made without actually updating data
 * 
 * Run with: node previewStateCleanup.js
 */

require('dotenv').config();
const db = require("./config/sequelize");
const { normalizeStateName, normalizeLGAName } = require('./cleanupStateData');

async function previewCleanup() {
  console.log('\n🔍 PREVIEW MODE - No data will be changed\n');
  console.log('=' .repeat(60));
  
  try {
    await db.sequelize.authenticate();
    console.log('✓ Database connection established');
    
    const supporters = await db.supporters.findAll({
      attributes: ['id', 'registrationNumber', 'state', 'LG'],
      order: [['createdAt', 'DESC']]
    });
    
    console.log(`\n📊 Analyzing ${supporters.length} supporters...\n`);
    
    let needsUpdateCount = 0;
    let correctCount = 0;
    const changes = [];
    const stateVariations = new Map();
    const lgaVariations = new Map();
    
    for (const supporter of supporters) {
      const oldState = supporter.state;
      const oldLG = supporter.LG;
      
      const newState = normalizeStateName(oldState);
      const newLG = normalizeLGAName(oldLG, newState);
      
      // Track variations
      if (!stateVariations.has(newState)) {
        stateVariations.set(newState, new Set());
      }
      stateVariations.get(newState).add(oldState);
      
      if (!lgaVariations.has(newLG)) {
        lgaVariations.set(newLG, new Set());
      }
      lgaVariations.get(newLG).add(oldLG);
      
      if (oldState !== newState || oldLG !== newLG) {
        needsUpdateCount++;
        changes.push({
          id: supporter.id,
          registrationNumber: supporter.registrationNumber,
          oldState,
          newState,
          oldLG,
          newLG
        });
      } else {
        correctCount++;
      }
    }
    
    console.log('='.repeat(60));
    console.log('\n📈 ANALYSIS RESULTS:\n');
    console.log(`🔄 Records that need updates: ${needsUpdateCount}`);
    console.log(`✓ Records already correct: ${correctCount}`);
    console.log(`📊 Total records: ${supporters.length}`);
    console.log(`📉 Update percentage: ${((needsUpdateCount / supporters.length) * 100).toFixed(2)}%`);
    
    // Show state variations
    console.log('\n📍 STATE VARIATIONS FOUND:\n');
    for (const [standard, variations] of stateVariations.entries()) {
      const uniqueVariations = Array.from(variations);
      if (uniqueVariations.length > 1 || uniqueVariations[0] !== standard) {
        console.log(`  ${standard}:`);
        uniqueVariations.forEach(v => {
          if (v !== standard) {
            console.log(`    - "${v}" → will be changed to "${standard}"`);
          }
        });
      }
    }
    
    // Show LGA variations (limit to ones with multiple variations)
    console.log('\n🏘️  LGA VARIATIONS FOUND (sample):\n');
    let lgaCount = 0;
    for (const [standard, variations] of lgaVariations.entries()) {
      const uniqueVariations = Array.from(variations);
      if (uniqueVariations.length > 1 || uniqueVariations[0] !== standard) {
        console.log(`  ${standard}:`);
        uniqueVariations.forEach(v => {
          if (v !== standard) {
            console.log(`    - "${v}" → will be changed to "${standard}"`);
          }
        });
        lgaCount++;
        if (lgaCount >= 5) {
          console.log('  ... (showing first 5 LGA variations)');
          break;
        }
      }
    }
    
    if (changes.length > 0) {
      console.log('\n📝 SAMPLE CHANGES (first 20):\n');
      changes.slice(0, 20).forEach((change, index) => {
        console.log(`${index + 1}. Reg: ${change.registrationNumber}`);
        if (change.oldState !== change.newState) {
          console.log(`   State: "${change.oldState}" → "${change.newState}"`);
        }
        if (change.oldLG !== change.newLG) {
          console.log(`   LG: "${change.oldLG}" → "${change.newLG}"`);
        }
        console.log('');
      });
      
      if (changes.length > 20) {
        console.log(`... and ${changes.length - 20} more changes\n`);
      }
      
      console.log('='.repeat(60));
      console.log('\n⚠️  To apply these changes, run:');
      console.log('   node cleanupStateData.js\n');
    } else {
      console.log('\n✅ All data is already in correct format!\n');
    }
    
  } catch (error) {
    console.error('\n❌ Error during preview:', error);
    process.exit(1);
  } finally {
    await db.sequelize.close();
    console.log('✓ Database connection closed\n');
  }
}

if (require.main === module) {
  previewCleanup()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('💥 Preview failed:', error);
      process.exit(1);
    });
}
