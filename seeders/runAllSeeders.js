require("dotenv").config();

async function runAllSeeders() {
  // Seeders:
  await require("./categorySeeder")();
  await require("./userSeeder")();
  await require("./adminSeeder")();
  await require("./productSeeder")();

  console.log("[Database] ¡Los datos de prueba fueron insertados!");
  process.exit();
}

runAllSeeders();
