$(document).ready(function(){

  let npcs = [
    {npcName: "beast", npcCoordinate: 0, health: 50, damage: 0},
    {npcName: "zombie", npcCoordinate: 1, health: 20, damage: 0},
    {npcName: "wolf", npcCoordinate: 2, health: 30, damage: 0},
  ];

  let Player = {
        damage: 0,
        x: 2,
        y: 1
  };

  let Shop = {
      x: 4,
      y: 2,
    };

  let World = {
      grid: "<table align='center'>",
      x: [],
      y: [],
      id: 0,
      taken: 0,
      inBattle: 0,
      newCoordinates: [],
      map: [
        [0,0,0],
        [0,0,0],
        [0,0,0]],

      drawMap: function(){
        for(var i = 0; i < this.map.length; i++) {
          this.x[i] = [];
          World.grid += "<tr>";
          for(var j = 0; j < this.map[i].length; j++){
            this.y[j] = [];
            World.grid += `<td id="${World.id}" data-occupied="10" class='square'">`;
            this.id++;
            World.spawnPlayer();
            World.spawnEnemies();
            if(this.map[i][j] !== 0){
                World.grid += this.map[i][j];
            }
            World.grid += "</td>";
          }
          World.grid += "</tr>";
        }
          World.grid += "</table>";
        $('#map').append(World.grid);
      },

      spawnPlayer: function(){
        $(".square").on('click', function(){
            var playerLoc = Player.character;
            var coordinates = 9;
            var newCoordinates = 0;
            var myCoords = [];
            let coords = [
              {index: "[0][0]", 0: 0},
              {index: "[0][1]", 0: 1},
              {index: "[0][2]", 0: 2},
              {index: "[1][0]", 1: 0},
              {index: "[1][1]", 1: 1},
              {index: "[1][2]", 1: 2},
              {index: "[2][0]", 2: 0},
              {index: "[2][1]", 2: 1},
              {index: "[2][2]", 2: 2},
            ];

            for (var prop in coords) {
                if (coords.hasOwnProperty(prop)) {
                    newCoordinates = coords[$(this).attr('id')];
                    if(newCoordinates){
                        newCoordinates;
                    }
                }
            }

            for(var y = 0; y < $(".square").length; y++){
                myCoords.push(y);
            }
            console.log($(this).attr("data-occupied"));
            if($(this).attr("data-occupied") >-1 && $(this).attr("data-occupied") != 8){
                $(this).addClass("player");
                $('.square').not($(this)).removeClass('player');
                $(this).attr("data-occupied", myCoords[$(this).attr('id')]);
                $(".console").prepend("<span>Command: Player has moved to coordinate: </span>" + `<span class='newMove'>${coords[$(this).attr("data-occupied")].index}</span><br/>`);
            }

            var glo;
            for(var prop in coords) {
                if(coords.hasOwnProperty(prop)) {
                    glo = coords;
                }
            }

            var val;
            var monsterHP;
            var PlayerDamage = (Math.floor(Math.random() * 4));

            for (var myprop in npcs) {
                if (npcs.hasOwnProperty(myprop)) {
                  for(var x = 0; x < glo.length; x++){
                    if($(this).attr("data-occupied") == npcs[myprop].npcCoordinate){
                      if(x==npcs[myprop].npcCoordinate){
                          if(npcs[myprop].health !=0 && npcs[myprop].health > 0){
                            monsterHP = npcs[myprop].health;
                            npcs[myprop].health -= PlayerDamage;
                            World.fightEnemy(npcs[myprop].npcName, monsterHP, PlayerDamage);
                            if(npcs[myprop].health <= 0){
                                npcs[myprop].health = 0;
                                $(".console").prepend("<span class='newMove'>You've already defeated: "+ (npcs[myprop].npcName)  +"</span><br>");
                          }
                          }else {
                                $(".console").prepend("<span class='newMove'>You've already defeated: "+ (npcs[myprop].npcName)  +"</span><br>");
                          }
                      } else{
                          // console.log("No Monster on this coordinate.");
                      }
                    }
                  }
               }
            }
        });
      },

      spawnEnemies: function(){
          for(var enemies in npcs) {
              if(npcs.hasOwnProperty(enemies)) {
                World.map[0][0] = `Name: ${npcs[0].npcName} <br> Health:${npcs[0].health}<br> Damage:${npcs[0].damage}`;
                World.map[0][1] = `Name: ${npcs[1].npcName} <br> Health:${npcs[1].health}<br> Damage:${npcs[1].damage}`;
                World.map[0][2] = `Name: ${npcs[2].npcName} <br> Health:${npcs[1].health}<br> Damage:${npcs[2].damage}`;
              }
          }
      },

      fightEnemy: function(name, monsterHP, dmg){
          $(".console").prepend("<span class='newMove'>Monster Health: "+ (monsterHP -= dmg) +"</span><br>");
          $(".console").prepend("<span>Player has attacked "+ name +" for: </span>" + `<span class='taken'>${dmg} damage</span><br/>`);
          $(".console").append("<span class='newMove'>Monster Health: "+ (monsterHP -= dmg)  +"</span><br>");
      }
  };
    World.drawMap();
    World.spawnPlayer();
    World.spawnEnemies();
});
