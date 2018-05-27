
include_once(['lib/world.js', 'lib/menu.js','lib/menuItem.js'])
function startMenu(init_level)
{
    var _menu = new menu();
    _menu.setPosition(260, 500)
    _menu.addItem( new menuItem('img/new-game.png') );

    var _bg    = gamejs.image.load('img/splash-screen.png');
    var _world = null;

    var _setupLevel = function( mainSurface ){
        //Initiate the world amd set the level to a reset
        _world          = new world();

        var lvlNum      = 0;
        if (init_level) {
            lvlNum = parseInt(init_level) - 1
        }

        var self        = this;

        var nextLevel = function(event){
            if ( typeof(event) !== 'undefined' )
            {
                event.preventDefault();
            }

            if ( $('#game_scorecard .nextLevel').hasClass('disabled') )
            {
                return false;
            }

            lvlNum++;

            resetLevel();
            return false;
        };

        var resetLevel = function(event){
            if ( typeof(event) !== 'undefined' )
            {
                event.preventDefault();
            }

            $('#game_scorecard_bg').hide();

            _world.init(lvlNum, mainSurface);
            return false;
        }

        var backToMenu = function(event){
            if ( typeof(event) !== 'undefined' )
            {
                event.preventDefault();
            }

            _world = null;
            $('#game_scorecard_bg').remove();
            return false;
        }

        $('.nextLevel').die();
        $('.resetLevel').die();
        $('.mainMenu').die();


        var saveEscapeLevel = function(level, next) {
            var to = DappAddress
            var value = '0'
            var callFunction = 'save'
            var callArgs = [level + '']

            var serialNumber
            var intervalQuery

            serialNumber = nebPay.call(to, value, callFunction, JSON.stringify(callArgs), {
                    listener: function (res) {
                          debugger
                          // 设置listener, 处理交易返回信息
                          console.log('response of push: ' + JSON.stringify(res))

                          next()
                        }
                })

            intervalQuery = setInterval(() => {
                fetchPayInfo()
              }, 20000)

            function fetchPayInfo() {
                return nebPay.queryPayInfo(serialNumber)
                    .then((resp) => {
                      console.log('tx result: ' + resp)
                      // resp is a JSON string
                      var respObject = JSON.parse(resp)
                      if (respObject.code === 0) {
                        alert(`游戏数据上链成功：等级${level}`)
                        clearInterval(intervalQuery)
                      }
                    })
                    .catch((err) => {
                      console.error(err)
                    })
            }

        }

        $('.nextLevel').live('click', function() {
            // 数据上链

            alert('消耗少量星云GAS，可以记录游戏等级哦~')

            saveEscapeLevel(lvlNum + 1, nextLevel)

        });
        $('.resetLevel').live('click', resetLevel);
        $('.mainMenu').live('click', backToMenu);

        //Initialise the first level
        nextLevel();
    }

    this.handleInput = function( mainSurface ){
        if ( _world === null )
        {
            gamejs.event.get().forEach(function(event){
                if ( event.type === gamejs.event.KEY_DOWN )
                {
                    if ( event.key == gamejs.event.K_ENTER )
                    {
                        _setupLevel( mainSurface );
                    }
                }
            });
        }
        else
        {
            _world.handleInput();
        }
    }

    this.update = function( msDuration ){
        if ( _world !== null )
        {
            _world.update( msDuration );
        }
    }

    this.draw = function( surface ){
        if ( _world === null )
        {
            surface.blit(_bg);
            _menu.draw( surface );
        }
        else
        {
            _world.draw( surface );
        }
    }
}
