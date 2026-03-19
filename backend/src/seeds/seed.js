import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Plant from '../models/Plant.js';
import LearningResource from '../models/LearningResource.js';
import Encyclopedia from '../models/Encyclopedia.js';
import Quiz from '../models/Quiz.js';
import Video from '../models/Video.js';
import ThreeDModel from '../models/ThreeDModel.js';
import Favorite from '../models/Favorite.js';
import User from '../models/User.js';
import plantsSeedData from './plantsData.js';
import learningResourcesData from './learningResourcesData.js';
import encyclopediaData from './encyclopediaData.js';
import quizzesData from './quizzesData.js';
import videosData from './videosData.js';
import threeDModelsData from './threeDModelsData.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seed...');
    console.log('📂 Loading seed data from files:');
    console.log('   ✓ plantsData.js');
    console.log('   ✓ learningResourcesData.js');
    console.log('   ✓ encyclopediaData.js');
    console.log('   ✓ quizzesData.js');
    console.log('   ✓ videosData.js');
    console.log('   ✓ threeDModelsData.js\n');
    
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/herbal-garden';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('\n🗑️  Clearing existing collections...');
    await Plant.deleteMany({});
    await LearningResource.deleteMany({});
    await Encyclopedia.deleteMany({});
    await Quiz.deleteMany({});
    await Video.deleteMany({});
    await ThreeDModel.deleteMany({});
    await Favorite.deleteMany({});
    console.log('✅ Cleared all existing data');

    // Insert plants
    const insertedPlants = await Plant.insertMany(plantsSeedData);
    console.log(`\n✅ Plants: ${insertedPlants.length}/${plantsSeedData.length} inserted`);

    // Insert learning resources
    const insertedResources = await LearningResource.insertMany(learningResourcesData);
    console.log(`✅ Learning Resources: ${insertedResources.length}/${learningResourcesData.length} inserted`);

    // Insert encyclopedia entries
    const insertedEncyclopedia = await Encyclopedia.insertMany(encyclopediaData);
    console.log(`✅ Encyclopedia: ${insertedEncyclopedia.length}/${encyclopediaData.length} inserted`);

    // Insert quizzes
    const insertedQuizzes = await Quiz.insertMany(quizzesData);
    console.log(`✅ Quizzes: ${insertedQuizzes.length}/${quizzesData.length} inserted`);

    // Insert videos
    const insertedVideos = await Video.insertMany(videosData);
    console.log(`✅ Videos: ${insertedVideos.length}/${videosData.length} inserted`);

    // Insert 3D models
    const insertedModels = await ThreeDModel.insertMany(threeDModelsData);
    console.log(`✅ 3D Models: ${insertedModels.length}/${threeDModelsData.length} inserted`);

    // Display summary
    console.log('\n📊 Database Seed Summary:');
    console.log('├─ Total plants: ' + insertedPlants.length);
    console.log('├─ AYUSH systems: ' + insertedAyush.length);
    console.log('├─ Learning resources: ' + insertedResources.length);
    console.log('├─ Tours: ' + insertedTours.length);
    console.log('├─ Encyclopedia entries: ' + insertedEncyclopedia.length);
    console.log('├─ Quizzes: ' + insertedQuizzes.length);
    console.log('├─ Videos: ' + insertedVideos.length);
    console.log('└─ 3D Models: ' + insertedModels.length);
    
    const totalCollections = 10;
    const totalDocuments = insertedPlants.length + insertedAyush.length + insertedResources.length + 
                          insertedTours.length + insertedEncyclopedia.length + insertedQuizzes.length + 
                          insertedVideos.length + insertedModels.length;
    
    console.log(`\n📈 Total: ${totalDocuments} documents across ${totalCollections} collections`);
    
    // Count by region
    const byRegion = await Plant.aggregate([
      { $group: { _id: '$region', count: { $sum: 1 } } }
    ]);
    console.log('\n📍 Plants by region:');
    byRegion.forEach(region => {
      console.log(`├─ ${region._id}: ${region.count}`);
    });

    // Count by type
    const byType = await Plant.aggregate([
      { $group: { _id: '$plantType', count: { $sum: 1 } } }
    ]);
    console.log('\n🌿 Plants by type:');
    byType.forEach(type => {
      console.log(`├─ ${type._id}: ${type.count}`);
    });

    // Count by AYUSH system
    const bySystem = await Plant.aggregate([
      { $unwind: '$ayushSystem' },
      { $group: { _id: '$ayushSystem', count: { $sum: 1 } } }
    ]);
    console.log('\n🌿 Plants by AYUSH system:');
    bySystem.forEach((system, idx) => {
      const isLast = idx === bySystem.length - 1;
      console.log(`${isLast ? '└─' : '├─'} ${system._id}: ${system.count}`);
    });

    console.log('\n📋 Seed Files Configuration:');
    console.log('├─ plantsData.js: ' + plantsSeedData.length + ' records');
    console.log('├─ ayushData.js: ' + ayushSystemsData.length + ' records');
    console.log('├─ learningResourcesData.js: ' + learningResourcesData.length + ' records');
    console.log('├─ toursData.js: ' + toursData.length + ' records');
    console.log('├─ encyclopediaData.js: ' + encyclopediaData.length + ' records');
    console.log('├─ quizzesData.js: ' + quizzesData.length + ' records');
    console.log('├─ videosData.js: ' + videosData.length + ' records');
    console.log('└─ threeDModelsData.js: ' + threeDModelsData.length + ' records');

    console.log('\n✨ Database seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

// Run seeding
seedDatabase();
