<template>
  <div class="escape">
    <div>
      <div id="preload">
          <img src="img/loading.gif" />
          <img src="img/loading-text.png" />
      </div>
      <div id="gameWindow">
          <canvas id="gjs-canvas"></canvas>
          <div id="gameEnd"></div>
      </div>
    </div>
    <Form :dialogFormVisible="showForm" @onSubmitSuccess="onFormSubmit"/>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import Form from '@/components/Form.vue'

export default {
  props: {
    msg: String
  },
  data() {
    return {
      showForm: false
    }
  },
  mounted () {
    this.init()
  },
  created () {
    // window.addEventListener('load', this.init.bind(this))
  },
  methods: {
    init: function () {
        this.getAccountInfo().then(res => {
          return this.fetchLevel(res)
        }).then(res => {
            console.log('getAccountInfo res: ', res)

            var level = res.level
            this.initGame(level)

        }).catch(err => {
            console.error('error:', err)
        })
    },
    getAccountInfo: function() {

        let addr = this.getAddress()

        if (!addr) {
          return this.callForm()
        } else {
          return Promise.resolve(addr)
        }
    },
    callForm: function() {
      return new Promise((resolve, reject) => {
        this.showForm = true
        debugger
        this.$on('callFormSuss', (res) => {
          debugger
          let addr = res.address
          if (addr) {
            this.setAccount(addr)
            this.showForm = false

            resolve(addr)
          } else {
            reject(res)
          }
        })
      });
    },
    onFormSubmit: function(res) {
      this.$emit('callFormSuss', res)
    },
    fetchLevel: function(addr) {
              // 获取链上数据
      var from = addr
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
    },
    initGame: function(level) {
      this.gamejs = window.gamejs
      this.gamejs.ready(() => {

        var self        = this;

        var display = this.gamejs.display.setMode([800, 600]);

        //Ensure that all required files are included
        include_once([
            'lib/startMenu.js'
        ]);

        var mainSurface = this.gamejs.display.getSurface();
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
        this.gamejs.time.fpsCallback(tick, self, 60);
      })
    },
    getAddress: function () {
       let addr = this.address || localStorage.getItem('neb_account_addr')

       if (!Account.isValidAddress(addr)) {
         return null
       } else {
         return addr
       }
    },
    setAccount: function (addr) {
      if (!Account.isValidAddress(addr)) {
        return false
      }

      this.account = Account.fromAddress(addr)
      this.address = this.account.getAddressString()

      localStorage.setItem('neb_account_addr', this.address)

      return this.account
    }
  },
  components: {
    Form
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>
