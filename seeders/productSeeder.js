const { Product, Category } = require("../models");

async function findCategoryIdByName(name) {
  try {
    const category = await Category.findOne({ name: name });
    if (category) {
      return category._id;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error: in category seeders", error);
    return null;
  }
}

const cafeDescafeinadoId = findCategoryIdByName("Café Descafeinado");
const cafesSaborizadosId = findCategoryIdByName("Cafés Saborizados");
const granosClasicosId = findCategoryIdByName("Granos Clásicos");
const granosEspecialesId = findCategoryIdByName("Granos Especiales");
const capsulasId = findCategoryIdByName("Cápsulas");

module.exports = async () => {
  const products = [
    {
      name: "COLOMBIAN DECAFF",
      category: await cafeDescafeinadoId,
      description:
        "Un café descafeinado es aquel al que se ha retirado la cafeína hasta un contenido menor a 0.1% para tostados.. La cafeína es el compuesto fisiológicamente más activo del café y el principal responsable de que el café nos despierte y nos de energía para trabajar. Sin embargo, algunas personas son especialmente sensibles a esta sustancia natural, por lo que el café descafeinado es una buena alternativa para que puedan disfrutar de la bebida sin los efectos estimulantes. Tratado para remover la cafeína permitiendo al café, conservar su cuerpo aroma y sabor. Pack 250 gr",
      photo:
        "https://iazyuszdrivuimeywxju.supabase.co/storage/v1/object/public/images/COLOMBIAN-DECAFF-1.jpg",

      price: 10,
      stock: 10,
      featured: true,
      slug: "colombian-decaff",
    },
    {
      name: "CHOCOLATE",
      category: await cafesSaborizadosId,
      description:
        "Realizados con el grano 100% arabigo y extractos naturales hasta un 3%. Estos extractos se agregan durante el proceso de tostado, permitiendo deslizar un sutil sabor sin opacar la fuerza del cafe. Blend de granos 100 % arábigos. Pack 250 gr",
      photo:
        "https://iazyuszdrivuimeywxju.supabase.co/storage/v1/object/public/images/saborizados-CHOCOLATE.jpg",
      price: 16,
      stock: 10,
      featured: true,
      slug: "chocolate",
    },
    {
      name: "VAINILLA",
      category: await cafesSaborizadosId,
      description:
        "Realizados con el grano 100% arabigo y extractos naturales hasta un 3%. Estos extractos se agregan durante el proceso de tostado, permitiendo deslizar un sutil sabor sin opacar la fuerza del cafe. Blend de granos 100 % arábigos. Pack 250 gr",
      photo:
        "https://iazyuszdrivuimeywxju.supabase.co/storage/v1/object/public/images/saborizados-VAINILLA.jpg",
      price: 16,
      stock: 10,
      featured: true,
      slug: "vainilla",
    },
    {
      name: "BRASIL MEDIUM ROAST",
      category: await granosClasicosId,
      description:
        "Un café sobresaliente y adaptado de variedades exclusivamente de la especie Arábiga, que crece en las altas montañas de los Andes Colombianos en rangos de temperaturas ideales a lo largo del año, que generan características y atributos excepcionalmente valorados por los consumidores más sofisticados. Es un café artesanal, procesado a través del beneficio húmedo, que contiene horas de esfuerzo y dedicación de miles de productores orgullosos de producir una bebida excepcional. Granos 100 % arábigos. Intensidad: Suave. Un café muy dulce, con dejo de sabor a cítrico y floral. Acidez vivaz, un cuerpo sedoso y una complejidad de notas florales en el aroma. Nuestro Brasil Santos Bourbon con un tueste más intenso que potencia sus cualidades. Pack 250 gr",
      photo:
        "https://iazyuszdrivuimeywxju.supabase.co/storage/v1/object/public/images/CLASICOS1.jpg",
      price: 14,
      stock: 10,
      featured: true,
      slug: "brasil-medium-roast",
    },
    {
      name: "BRASIL SANTOS BOURBON",
      category: await granosClasicosId,
      description:
        "Este café proveniente de Brasil, uno de los más importantes de este país, se hace con los mejores granos. Secado al sol, posee el cuerpo y el peso de los cafés con carácter propio. Cultivado en el norte de Minas Gerais o en el estado de Sao Paulo. Es llamado comúnmente Santos ya que este producto de alta calidad es enviado a distintas partes del mundo en mayor medida por el puerto de Santos. Las plantas de Brasil son descendientes de las traídas de la isla de La Reunión, antes Bourbón (de ahí su nombre), localizada en el Océano Índico.Blend de granos 100 % arábigos de Santos Bourbon en diferentes etapas, ciclos. El resultado un café más fino y equilibrado. Intensidad: Suave. Sofisticada selección de granos que conforman un blend suave y cremoso con un dejo levemente dulce. Pack 250 gr",
      photo:
        "https://iazyuszdrivuimeywxju.supabase.co/storage/v1/object/public/images/CLASICOS2.jpg",
      price: 14,
      stock: 10,
      featured: true,
      slug: "brasil-santos-bourbon",
    },
    {
      name: "COFFEE PASSION",
      category: await granosClasicosId,
      description:
        "Este varietal posee un sabor genuino y surge de un proceso en continua evolución que combina materias primas selectas, investigación y desarrollo. El perfil de tueste se creó específicamente para este Etiope Yirgachaffe destacando sus notas organolépticas para que se conjugan con armonía y personalidad.Blend de granos 100 % arábigos. Intensidad: Fuerte. Un café muy dulce, con dejo de sabor a cítrico y floral. Acidez vivaz, un cuerpo sedoso y una complejidad de notas florales en el aroma, a veces con un toque de coco tostado. El retrogusto es vibrante y el café puede presentar matices de baya o vino. Los Yirgacheffes etíopes son picantes y fuertes. En su aroma predominan la madera y la pimienta con un dejo alicorado a medida que va perdiendo calor. Pack 250 gr",
      photo:
        "https://iazyuszdrivuimeywxju.supabase.co/storage/v1/object/public/images/CLASICOS3.jpg",
      price: 14,
      stock: 10,
      featured: true,
      slug: "coffee-passion",
    },
    {
      name: "COLOMBIAN DARK",
      category: await granosClasicosId,
      description:
        "Un café sobresaliente y adaptado de variedades exclusivamente de la especie Arábiga, que crece en las altas montañas de los Andes Colombianos en rangos de temperaturas ideales a lo largo del año, que generan características y atributos excepcionalmente valorados por los consumidores más sofisticados. Es un café artesanal, procesado a través del beneficio húmedo, que contiene horas de esfuerzo y dedicación de miles de productores orgullosos de producir una bebida excepcional. Granos 100 % arábigos. Intensidad: Suave. Un café muy dulce, con dejo de sabor a cítrico y floral. Acidez vivaz, un cuerpo sedoso y una complejidad de notas florales en el aroma. Nuestro Colombian Supremo sometido al máximo tueste intensificando aroma, sabor y reduciendo acidez. Pack 250 gr",
      photo:
        "https://iazyuszdrivuimeywxju.supabase.co/storage/v1/object/public/images/CLASICOS4.jpg",
      price: 18,
      stock: 10,
      featured: true,
      slug: "colombian-dark",
    },
    {
      name: "COLOMBIAN SUPREMO",
      category: await granosClasicosId,
      description:
        "Un café sobresaliente y adaptado de variedades exclusivamente de la especie Arábiga, que crece en las altas montañas de los Andes Colombianos en rangos de temperaturas ideales a lo largo del año, que generan características y atributos excepcionalmente valorados por los consumidores más sofisticados. Es un café artesanal, procesado a través del beneficio húmedo, que contiene horas de esfuerzo y dedicación de miles de productores orgullosos de producir una bebida excepcional.Granos 100 % arábigos. Intensidad: Suave. Un café muy dulce, con dejo de sabor a cítrico y floral. Acidez vivaz, un cuerpo sedoso y una complejidad de notas florales en el aroma. Un café dulce, con dejo a sabor cítrico y floral, acidez vivaz y cuerpo sedoso.Pack 250 gr",
      photo:
        "https://iazyuszdrivuimeywxju.supabase.co/storage/v1/object/public/images/CLASICOS5.jpg",
      price: 17,
      stock: 10,
      featured: true,
      slug: "colombian-supremo",
    },
    {
      name: "HONDURAS",
      category: await granosEspecialesId,
      description:
        "CAFE HONDURAS. REGION MARCALA, LAVADO, ALTURA 1.500 MTS A 1.650 MTS. CUERPO SUAVE, INTENSIDAD 3, ACIDEZ 3, TOSTADO MEDIO. Notas de naranja, caramelo y almendras, ideal para tomarlo solo o con leche. Envase 250 gr.",
      photo:
        "https://iazyuszdrivuimeywxju.supabase.co/storage/v1/object/public/images/ESPECIALES_1.jpg",
      price: 23,
      stock: 10,
      featured: true,
      slug: "honduras",
    },
    {
      name: "NICARAGUA",
      category: await granosEspecialesId,
      description:
        "NICARAGUA ML LAS SEGOVIAS FINCA LA BENDICION PACAMARA NAT. El café Pancamara Natural, de Finca La Bendición fue seleccionado como uno de los 30 mejores cafés del mundo en 2015. Procesado en seco de forma natural dentro de la cereza del café, lo cual permite extraer un sabor complejo e interesante. Sentirás aroma a rosas, cacao tostado, limón azucarado y moras. En boca se aprecia profundo, dulce, ligeramente ácido y satinado. Blend de granos: 100% arábigos. Calidad SHG (StrictlyIgh Grow-Estrictamente Altura) Intensidad: Media De sabor complejo e interesante. Cuerpo medio y muy cremoso. Pack 250 gr",
      photo:
        "https://iazyuszdrivuimeywxju.supabase.co/storage/v1/object/public/images/ESPECIALES_2.jpg",
      price: 23,
      stock: 10,
      featured: true,
      slug: "nicaragua",
    },
    {
      name: "PAPÚA NUEVA GUINEA",
      category: await granosEspecialesId,
      description:
        "Papúa Nueva Guinea ocupa la mitad oriental de la isla que comparte con Irian Jaya, que produce sólo una pequeña cantidad de café. Es un mundo de distancia de Java o Sumatra, geográfica y culturalmente, y en la mayoría de los aspectos de la producción de café. Tampoco utilizan el beneficio con el pergamino húmedo como tantos cafés Indonesios. Las zonas de cafetales de Papúa ocupan una cadena montañosa continua, pero se distinguen sobre todo como cafés de «Tierras Altas Orientales» (Eastern Highlands) y «Tierras Altas Occidentales» (Western Highlands). La región de Western Highlands es el hogar de nuestro PNG. Su capital provincial y ciudad central es Mount Hagen. Su economía está fuertemente basada en el café. Esta región disfruta de un clima fresco, templado y con precipitaciones todo el año, lo que genera condiciones micro climáticas ideales para su cultivo. Sabor audaz, notas de chocolate, dulce, ácido y afrutado con un cuerpo medio a fuerte y un final ligeramente cremoso y suave. Pack 250 gr",
      photo:
        "https://iazyuszdrivuimeywxju.supabase.co/storage/v1/object/public/images/ESPECIALES_3.jpg",
      price: 23,
      stock: 10,
      featured: true,
      slug: "papua-nueva-guinea",
    },
    {
      name: "BRASIL SUAVE",
      category: await capsulasId,
      description:
        "Elaboradas con Brasil Santos Bourbon.Sofisitcada selección de granos que conforman un blend suave y cremoso con un dejo levemente dulce. Pack 10 U.",
      photo:
        "https://iazyuszdrivuimeywxju.supabase.co/storage/v1/object/public/images/capsulas1.jpg",
      price: 9,
      stock: 10,
      featured: true,
      slug: "brasil-suave",
    },
    {
      name: "COLOMBIA DECAFF CAPSULAS",
      category: await capsulasId,
      description:
        "Elaboradas con Colombian Decaff. Tratado para remover la cafeína permitiendo al café, conservar su cuerpo aroma y sabor. Pack 10 U.",
      photo:
        "https://iazyuszdrivuimeywxju.supabase.co/storage/v1/object/public/images/capsulas2.jpg",
      price: 9,
      stock: 10,
      featured: true,
      slug: "colombia-decaff-capsulas",
    },
    {
      name: "COLOMBIA FUERTE",
      category: await capsulasId,
      description:
        "Elaboradas con Colombian Supremo.Un café dulce, con dejo a sabor cítrico y floral, acidez vivaz  y cuerpo sedoso.Pack 10 U.",
      photo:
        "https://iazyuszdrivuimeywxju.supabase.co/storage/v1/object/public/images/capsulas3.jpg",
      price: 9,
      stock: 10,
      featured: true,
      slug: "colombia-fuerte",
    },
    {
      name: "PASSION MEDIO",
      category: await capsulasId,
      description:
        "Elaboradas con Coffee Passion. En su aroma predominan la madera y la pimienta con un dejo alicorado a medida que va perdiendo calor. Pack 10 U.",
      photo:
        "https://iazyuszdrivuimeywxju.supabase.co/storage/v1/object/public/images/capsulas4.jpg",
      price: 9,
      stock: 10,
      featured: true,
      slug: "passion-medio",
    },
  ];

  await Product.insertMany(products);
};
