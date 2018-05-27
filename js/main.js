gamejs = require('gamejs');
font   = require('gamejs/font');

//Preload all the required images
gamejs.preload([
    'img/splash-screen.png','img/new-game.png', 'img/bg.png','img/player.png',
    'img/blank.png','img/switch.png','img/door.png','img/goal.png',
    'img/platform-left.png','img/platform-right.png',
    'img/platform-middle.png', 'img/selected.png',
    'img/scorecard-background.png','img/game-window.png',
    'img/reset.png', 'img/star-off.png', 'img/star-on.png',
    'img/menu-button.png', 'img/next-button.png', 'img/end.png'
]);

gamejs.ready(function() {


    var self        = this;

    getAccountInfo().then(res => {
        debugger
        console.log('getAccountInfo res: ', res)

        var level = res.level
        init(level)

    }).catch(err => {
        console.error('error:', err)
    })

    function init(level) {
        var display = gamejs.display.setMode([800, 600]);

        //Ensure that all required files are included
        include_once([
            'lib/startMenu.js'
        ]);

        var mainSurface = gamejs.display.getSurface();
        var mainWindow  = new startMenu(level);

        // msDuration = time since last tick() call
        var tick = function(msDuration){
            mainSurface.fill("#FFFFFF");

            //Handle user input
            mainWindow.handleInput( mainSurface );

            //Update the worlds objects
            mainWindow.update( msDuration );

            //Draw the new objects
            mainWindow.draw( mainSurface );
        };

        //Set up listeners for the body when a scorecard is present
        $('body').keydown(function(event){
            //Only check key presses if the scorcard is shown
            if ( $('#game_scorecard').is(":visible") )
            {
                switch ( event.keyCode )
                {
                    //Enter and e will all move to the next level
                    case 13:
                    case 69:
                        $('#game_scorecard .nextLevel').click();
                        event.preventDefault();
                        break;
                    //Escape will quit to the menu
                    case 27:
                        $('#game_scorecard .mainMenu').click();
                        event.preventDefault();
                        break;
                    //r will reset the level
                    case 82:
                        $('#game_scorecard .resetLevel').click();
                        event.preventDefault();
                        break;
                }
            }
        });

        //Remove the loading bar
        $('#preload').remove();
        $('#gameWindow').show();

        //Set up the tick function, run at 60fps
        gamejs.time.fpsCallback(tick, self, 60);
    }

    function getAccountInfo() {
        // 获取链上数据
        var from = Account.NewAccount().getAddressString()
        var callArgs = []

        var opt = {
            from: from,
            to: DappAddress,
            value: 0,
            nonce: 0,
            gasPrice: 1000000,
            gasLimit: 2000000,
            contract: {
              function: 'get',
              args: JSON.stringify(callArgs)
            }
        }

        return neb.api.call(opt).then((res) => {
            var result = res.result
            // res is an object, res.result is a JSON string
            console.log('return of rpc call: ' + JSON.stringify(result))

            if (result === 'null') {
              return null
            } else {
              // if result is not null, then it should be "return value" or "error message"
              try {
                result = JSON.parse(result)
              } catch (err) {
                // result is the error message
              }

              if (!!result.level) {
              // "return value"
                return result
              } else {
              // "error message"
                return null
              }
            }
          }).catch((err) => {
            console.error('error:' + err.message)
          })
    }
});


