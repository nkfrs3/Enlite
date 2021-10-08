'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
    */

      return queryInterface.bulkInsert('Shops', [
      {
        name: 'Sure House',
        address: '151 S Market St, Wooster, OH',
        website:'https://www.surehousecoffee.com/',
        image:'https://static.wixstatic.com/media/4bf9cf_608a64769ee84a6fb95a0594a0420188~mv2.png/v1/fill/w_368,h_123,al_c,q_85,usm_0.66_1.00_0.01/4bf9cf_608a64769ee84a6fb95a0594a0420188~mv2.webp',
        lat: 40.79741255146078,
        long: -81.94023696133338,
      },{
        name: 'Mission Coffee Co.',
        address: '2050 S High St, Columbus, OH 43207',
        website:'https://www.missioncoffeeco.com/',
        image:'https://cdn.shopify.com/s/files/1/0971/8552/t/26/assets/logo.png?v=8232725817368483806',
        lat: 39.919715176476515,
        long: -82.99505571717367,
      }, {
        name: 'Generations Coffee House',
        address: '31 S. Main St, Columbiana, OH',
        website:'http://generationsch.com/',
        image:'http://images.squarespace-cdn.com/content/v1/54bd3b79e4b06f2c55fa0d5f/1518468347373-HXQJ65O5VH4L8DVYWVI8/Generations+Logo+v7+white.png?format=1500w',
        lat: 40.89806365719152,
        long: -80.69326742338701,
      },
      {
        name: 'Donkey Coffee and Espresso',
        address: '17 1/2 W. Washington St., Athens, OH',
        website:'https://donkeycoffee.com/',
        image:'https://donkeycoffee.com/wp-content/uploads/2013/04/Donkey-Coffee-Athens-OH-standard-logo.jpg',
        lat: 39.38383111821412,
        long: -82.12153621429962,
      },
      {
        name: 'Plate 21',
        address: '3664 Rugby Dr., Toledo, OH',
        website:'https://platecafes.com/',
        image:'backend/db/seeders/Plate-21-Logo-300x246.jpg',
        lat: 41.59937941432561,
        long: -83.61067463950259,
      },
      {
        name: "Mr. Smith's Coffee House",
        address: '140 Columbus Ave., Sandusky, OH',
        website:'http://mrsmithscoffee.com/',
        image:'http://mrsmithscoffee.com/wp-content/uploads/2021/05/MrSmithsLogo_aha.png',
        lat: 41.457025681901975,
        long: -82.7116989597701,
      },
      {
        name: 'Rost Coffee',
        address: '107 E 2nd St, Chillicothe, OH',
        website:'https://rostcoffee.com/collections/coffee',
        image:'https://cdn.shopify.com/s/files/1/0377/1960/5381/files/RostLogo09_12_18.png?v=1587571924',
        lat: 39.73109681293032,
        long: -84.14161428237503,
      },
      {
        name: 'Deeper Roots Coffee',
        address: '3056 Madison Rd. Cincinnati, OH',
        website:'https://www.deeperrootscoffee.com/',
        image:'https://images.squarespace-cdn.com/content/v1/562e5b23e4b01612295117fa/1539627199966-JTNS3T8NHNU1LIXCWLX4/DRC-Logo-horizontal.png?format=1500w',
        lat: 39.15235553792139,
        long: -84.43192289167357,
      },
      {
        name: 'Press Coffee Bar',
        address: '257 Wayne Ave. Dayton, OH',
        website:'https://www.pressdayton.com/locations',
        image:'https://images.squarespace-cdn.com/content/v1/5ee235f8074e5229072cb713/1593879101801-W54I4R2KYQI3V1BQAMYM/Press+Logo_2019.png?format=1500w',
        lat:  39.73109681293032,
        long: -84.14161428237503,
      },
      {
        name: 'Coffee @ The Lofts',
        address: '842 Gallia St., Portsmouth, OH',
        website:'https://loftscoffeecompany.com/',
        image:'https://loftscoffeecompany.com/wp-content/uploads/2019/02/cropped-Lofts-Coffee-Company-Logo-Stacked.png',
        lat: 38.73417922300163,
        long: -82.99470327334559,
      },
      {
        name: 'Coffee Amici',
        address: '328 S. Main St., Findlay, OH',
        website:'https://coffeeamici.com/',
        image:'https://coffeeamici.com/wp-content/uploads/2018/05/header-logo-3.png',
        lat: 41.039236181576314,
        long: -83.6504138232761,
      },
      {
        name: 'The Roosevelt Coffeehouse',
        address: '300 E Long St., Columbus, OH',
        website:'https://www.rooseveltcoffee.org/',
        image:'https://www.rooseveltcoffee.org/wp-content/uploads/roosevelt_lines_white_web.png',
        lat: 39.966452620993834,
        long: -82.99310451563751,
      },
      {
        name: 'Artisan Coffee',
        address: '662 Canton Road, Akron, OH',
        website:'https://artisancoffee.us/',
        image:'https://static.wixstatic.com/media/be7cca_cd518d4cde3d4a54a3f98a095efeef9a~mv2.png/v1/fill/w_177,h_59,al_c,q_85,usm_0.66_1.00_0.01/White.webp',
        lat: 39.88773499305709,
        long: -84.19938554447562,
      },
      {
        name: 'Hemingway’s Coffee Nook',
        address: '175 S 3rd St, Columbus, OH',
        website:'n/a',
        image:'https://10619-2.s.cdn12.com/rests/original/330_176580498.jpg',
        lat: 39.959814,
        long: -82.997996,
      },
      {
        name: 'Urbana Cafe',
        address: '1206 Broadway St., Cincinnati',
        website:'https://www.urbana-cafe.com/',
        image:'https://images.squarespace-cdn.com/content/v1/5f6f9269c793233e0488bf61/1601148547940-AJQUKW03937PWS72NCLM/White_Urbana+Cafe-B%26W-VespaCircle.png?format=1500w',
        lat: 39.11012982670462,
        long: -84.50830047301214,
      },
      {
        name: 'Bent Tree Coffee Roasters',
        address: '313 N Water St, Kent, OH',
        website:'https://www.benttreecoffee.com/',
        image:'https://images.squarespace-cdn.com/content/v1/5bc8c105d745626f8e32f1d5/1552589137805-9XE65QJ4ON6H7KM1BY5W/CAFE_GREEN.png?format=300w',
        lat: 41.157205188769105,
        long:-81.35791626137045,
      },
      {
        name: 'Coffeology',
        address: '43 N Sandusky St, Delaware, OH',
        website:'http://coffeeologyoh.com/',
        image:'http://coffeeologyoh.com/wp-content/uploads/2019/05/coffeeologybig_white-155x83.png',
        lat: 40.30062475760483,
        long: -83.0678441798647,
      },
      {
        name: 'Rust Belt Coffee',
        address: '119 N Ontario St. Toledo OH',
        website:'https://rustbeltcoffee.com/',
        image:'https://rustbeltcoffee.com/wp-content/uploads/2021/05/RUST000002-Full-Logo-Horizontal-1-1024x309-400x120.png',
        lat: 41.65162778543169,
        long: -83.54082785284223,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

    */
      return queryInterface.bulkDelete('Shops', null, {});
  }
};
