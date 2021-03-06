/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Node = require('../api/node/node.model');
var Trip = require('../api/trip/trip.model');

Node.find({}).remove(function() {
  Node.create({
    num: 1,
    name: 'location',
    question: 'Where do you want to go?',
    connections: []
  }, {
    num: 2,
    name: 'startdate',
    question: 'When do you want to go?',
    connections: []
  }, {
    // IGNORE THIS NODE.  START AND END DATES ARE ADDED IN NODE 2
    num: 3,
    name: 'duration',
    question: 'How long are you planning to go for?',
    connections: []
    // END IGNORE NODE
  }, {
    // IGNORE THIS NODE.
    num: 4,
    name: 'tripType',
    question: 'What are you going on this trip for?',
    connections: []
    // END IGNORE NODE
  }, {
    //IGNORE
    num: 5,
    name: 'travellingWithWho',
    question: 'Are you travelling alone, or with friends?',
    connections: []
  }, {
    //IGNORE
    num: 6,
    name: 'pax',
    question: 'How many people are going?',
    connections: []
  }, {
    //IGNORE
    num: 7,
    name: 'isSharing',
    question: 'Is everyone going to be sharing the cost of the trip?',
    connections: []
  }, {
    //IGNORE
    num: 8,
    name: 'singleBudget',
    question: 'What is your budget?',
    connections: []
  }, {
    //IGNORE
    num: 9,
    name: 'groupShareBudget',
    question: 'What is each person\'s budget?',
    connections: []
  }, {
    //IGNORE
    num: 10,
    name: 'groupSingleBudget',
    question: 'What is the trip budget?',
    connections: []
  }, {
    //IGNORE
    num: 11,
    name: 'groupHaveTravelArrangements',
    question: 'Does your party already have travel arrangements?',
    connections: []
  }, {
    //IGNORE
    num: 12,
    name: 'groupFlightDetails',
    question: 'What are your flight details?',
    connections: []
  }, {
    //IGNORE
    num: 13,
    name: 'separateOrTogether',
    question: 'Will the members of your party be travelling together or separately?',
    connections: []
  }, {
    //IGNORE
    num: 14,
    name: 'singleHaveTravelArrangements',
    question: 'Do you already have travel arrangements?',
    connections: []
  }, {
    //IGNORE
    num: 15,
    name: 'singleFlightDetails',
    question: 'What are your flight details?',
    connections: []
  }, {
    num: 16,
    name: 'haveAccommodation',
    question: 'Do you have a place to stay?',
    connections: []
  }, {
    num: 17,
    name: 'accommodationAddress',
    question: 'Where are you staying?',
    connections: []
  }, {
    num: 18,
    name: 'complete',
    question: 'Done!',
    connections: []
  }, function(err, data) {
      Node.find({}, function(err, data) {
        var nodes = data;
        var compare = function(node1, node2) {
          if (node1.num < node2.num) return -1;
          if (node1.num > node2.num) return 1;
        };
        nodes = nodes.sort(compare);
        nodes[0].connect(null, "autocomplete", nodes[1]);
        nodes[1].connect(null, "date", nodes[15]);
        // This node was removed to put start and end dates
        // on the same page
        // nodes[2].connect(null, "otherwise", nodes[3]);

        // IGNORE THESE NODES - WILL IMPLEMENT LATER
        // nodes[3].connect(null, "otherwise", nodes[4]);
        // nodes[4].connect("Travelling alone", "normal", nodes[7]);
        // nodes[4].connect("With friends", "normal", nodes[5]);
        // nodes[5].connect(null, "otherwise", nodes[6]);
        // nodes[6].connect("The cost will be shared", "normal", nodes[8]);
        // nodes[6].connect("One person will be paying", "normal", nodes[9]);
        // nodes[7].connect(null, "money", nodes[13]);
        // nodes[8].connect(null, "otherwise", nodes[10]);
        // nodes[9].connect(null, "otherwise", nodes[10]);
        // nodes[10].connect("Yes", "normal", nodes[11]);
        // nodes[10].connect("No", "normal", nodes[12]);
        // nodes[11].connect(null, "otherwise", nodes[12]);
        // nodes[12].connect("We will be travelling together", "normal", nodes[15]);
        // nodes[12].connect("We will be travelling separately", "normal", nodes[15]);
        // nodes[13].connect("Yes", "normal", nodes[14]);
        // nodes[13].connect("No", "normal", nodes[15]);
        // nodes[14].connect(null, "otherwise", nodes[15]);
        nodes[15].connect("Yes", "normal", nodes[16]);
        nodes[15].connect("No", "normal", nodes[17]);
        nodes[16].connect(null, "autocomplete", nodes[17]);
      });
  });
});

// Trip.find({}).remove(function() {
//   Trip.create({
//     name: "Paris 2014",
//     days: [{
//       date: 'Mon Jan 02 2012 00:00:00 GMT+0100 (CET)',
//       activities: [{
//         name: "Uva Enoteca",
//         location: {
//           address: "568 Haight St, San Francisco, CA 94117, United States",
//           coords: {
//             latitude: 37.772125,
//             longitude: -122.43161199999997
//           }
//         },
//         description: "bar",
//         time: 'Mon Jan 02 2012 00:10:00 GMT+0100 (CET)',
//         cost: 2
//       }]
//     }],
//     budget: 3000
//   }, {
//     name: "Brussels 2014",
//     days: [{
//       date: 'Mon Jan 02 2012 00:00:00 GMT+0100 (CET)',
//       activities: [{
//         name: "Uva Enoteca",
//         location: {
//           address: "568 Haight St, San Francisco, CA 94117, United States",
//           coords: {
//             latitude: 37.772125,
//             longitude: -122.43161199999997
//           }
//         },
//         description: "bar",
//         time: 'Mon Jan 02 2012 00:10:00 GMT+0100 (CET)',
//         cost: 2
//       }]
//     }],
//     budget: 3000
//   }, {
//     name: "London 2014",
//     days: [{
//       date: 'Mon Jan 02 2012 00:00:00 GMT+0100 (CET)',
//       activities: [{
//         name: "Uva Enoteca",
//         location: {
//           address: "568 Haight St, San Francisco, CA 94117, United States",
//           coords: {
//             latitude: 37.772125,
//             longitude: -122.43161199999997
//           }
//         },
//         description: "bar",
//         time: 'Mon Jan 02 2012 00:10:00 GMT+0100 (CET)',
//         cost: 2
//       }]
//     }],
//     budget: 3000
//   })
// });

var testTrip = {name: "London 2014", days: [{date: 'Mon Jan 02 2012 00:00:00 GMT+0100 (CET)', activities: [{name: "Uva Enoteca", location: {address: "568 Haight St, San Francisco, CA 94117, United States", coords: {latitude: 37.772125, longitude: -122.43161199999997 } }, description: "bar", time: 'Mon Jan 02 2012 00:10:00 GMT+0100 (CET)', cost: 2 }] }], budget: 3000 }

var testTrip2 = {name: "Spain 2014", days: [{date: 'Mon Jan 02 2012 00:00:00 GMT+0100 (CET)', activities: [{name: "Uva Enoteca", location: {address: "568 Haight St, San Francisco, CA 94117, United States", coords: {latitude: 37.772125, longitude: -122.43161199999997 } }, description: "bar", time: 'Mon Jan 02 2012 00:10:00 GMT+0100 (CET)', cost: 2 }] }], budget: 3000 }

var testTrip3 = {name: "France 2014", days: [{date: 'Mon Jan 02 2012 00:00:00 GMT+0100 (CET)', activities: [{name: "Uva Enoteca", location: {address: "568 Haight St, San Francisco, CA 94117, United States", coords: {latitude: 37.772125, longitude: -122.43161199999997 } }, description: "bar", time: 'Mon Jan 02 2012 00:10:00 GMT+0100 (CET)', cost: 2 }] }], budget: 3000 };


// User.find({}).remove(function() {
//   User.create({
//     provider: 'local',
//     name: 'Test User',
//     email: 'test@test.com',
//     password: 'test'
//   }, {
//     provider: 'local',
//     role: 'admin',
//     name: 'Admin',
//     email: 'admin@admin.com',
//     password: 'admin'
//   }, function() {
//       User.find({}, function(err, data) {
//         var users = data;
//         users[0].trips.push(testTrip);
//         users[0].trips.push(testTrip2);
//         users[0].trips.push(testTrip3);
//         console.log(users[0].trips);
//         users[0].save();
//       })
//       console.log('finished populating users');
//     }
//   );
// });