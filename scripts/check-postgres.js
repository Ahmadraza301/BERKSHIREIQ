import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function checkPostgres() {
  console.log('🔍 Checking PostgreSQL installation...\n');

  try {
    // Try to check if PostgreSQL is installed
    const { stdout } = await execAsync('psql --version');
    console.log('✅ PostgreSQL is installed:');
    console.log(`   ${stdout.trim()}\n`);
    
    // Try to connect
    console.log('🔌 Testing database connection...');
    try {
      const { testConnection } = await import('../src/config/vectorStore.js');
      const connected = await testConnection();
      
      if (connected) {
        console.log('✅ Database connection successful!\n');
        console.log('📋 Next steps:');
        console.log('   1. Initialize database: psql -U postgres -d 421302 -f scripts/init-db.sql');
        console.log('   2. Ingest data: node scripts/ingest.js');
        console.log('   3. Start app: npm run dev\n');
      } else {
        console.log('❌ Database connection failed\n');
        console.log('📋 Possible issues:');
        console.log('   1. PostgreSQL service not running');
        console.log('   2. Database "421302" does not exist');
        console.log('   3. Wrong credentials in .env file');
        console.log('   4. pgvector extension not installed\n');
        console.log('💡 To fix:');
        console.log('   1. Start PostgreSQL service');
        console.log('   2. Create database: psql -U postgres -c "CREATE DATABASE \\"421302\\";"');
        console.log('   3. Install pgvector: psql -U postgres -d 421302 -c "CREATE EXTENSION vector;"');
        console.log('   4. Initialize tables: psql -U postgres -d 421302 -f scripts/init-db.sql\n');
      }
    } catch (dbError) {
      console.log('❌ Cannot test database connection:', dbError.message, '\n');
    }
    
  } catch (error) {
    console.log('❌ PostgreSQL is NOT installed or not in PATH\n');
    console.log('📋 Installation options:\n');
    console.log('Option 1 - Install PostgreSQL:');
    console.log('   Windows: https://www.postgresql.org/download/windows/');
    console.log('   Mac: brew install postgresql@15');
    console.log('   Linux: sudo apt-get install postgresql-15\n');
    console.log('Option 2 - Use Docker:');
    console.log('   docker run --name berkshire-postgres \\');
    console.log('     -e POSTGRES_PASSWORD=421302 \\');
    console.log('     -e POSTGRES_DB=421302 \\');
    console.log('     -p 5432:5432 \\');
    console.log('     -d ankane/pgvector\n');
    console.log('📖 See SETUP_GUIDE.md for detailed instructions\n');
  }
}

checkPostgres().catch(console.error);
