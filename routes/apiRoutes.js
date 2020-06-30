var db = require("../models");
var NodeGeocoder = require("node-geocoder");
var geocoder = NodeGeocoder({ provider: "openstreetmap" });
module.exports = function(app) {
  app.get("/api/trips/:id", function(req, res) {
    db.Destination.findAll({
      where: { UserId: req.params.id }
    }).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });
  app.get("/api/activities/:id", function(req, res) {
    db.Destination.findAll({
      where: { arrivalCity: req.params.id },
      include: [db.Activity]
    }).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });
  app.post("/api/activities", function(req, res) {
    console.log(req.body);
    db.Activity.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });
  app.post("/api/trips", function(req, res) {
    db.Destination.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });
  app.post("/api/users", function(req, res) {
    console.log(req.body);
    db.User.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });
  app.put("/api/users/:id", function(req, res) {
    console.log(req.body);
    db.User.update(
      { milesTraveled: req.body.milesTraveled },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(results) {
      res.json(results);
    });
  });
  app.put("/api/trips/:id", function(req, res) {
    console.log(req.body);
    db.Destination.update(
      { tripBlog: req.body.tripBlog, savedTrip: req.body.savedTrip },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(results) {
      res.json(results);
    });
  });

  app.get("/distances/:loc1/:loc2", function(req, res) {
    var loc1 = req.params.loc1;
    var loc2 = req.params.loc2;
<<<<<<< HEAD
    console.log(loc1, loc2);
    geocoder.geocode(loc1)
    .then(function(result) {
        console.log(result[0]);
        geocoder.geocode(loc2)
        .then(function(result2) {
            console.log(result2[0]);
            var distance = geolib.getDistance(
                {latitude: result[0].latitude, longitude: result[0].longitude},
                {latitude: result2[0].latitude, longitude: result2[0].longitude},
            )
            res.json({a:result[0], b:result2[0], distance: distance});
        })
    })
    .catch(function(err) {
        res.json(err);
    })
});

  // Delete an example by id
=======
    console.log(loc1);
    console.log(loc2);
    console.log(loc1);
    console.log(loc2);
    geocoder.geocode(loc1).then(function(result) {
      console.log(result[0]);
      geocoder.geocode(loc2).then(function(result2) {
        console.log(result2[0]);
        res.json({ depart: result[0], arrive: result2[0] });
      });
    });
  });
>>>>>>> 4b46683e2fa1a3289138f2f35e1ac7ccdfa7e15b
  app.delete("/api/trips/:id", function(req, res) {
    db.Destination.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
