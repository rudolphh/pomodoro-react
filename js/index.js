'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* Thanks to FCC and @no-stack-dub-sack (github) / @no_stack_sub_sack (codepen)
 for his work on the example.  
 
 Thanks to @maksad (codepen) for the inspiration of a fill timer http://codepen.io/maksad/pen/RpLxVB
 
 Thanks to @kevinweber (codepen) for showing a sane way to fill
 https://codepen.io/kevinweber/pen/QwgKMX?editors=0010
 
 And ultimately thanks to my family for their love and support.  
 
 */

var Control = function (_React$Component) {
  _inherits(Control, _React$Component);

  function Control(props) {
    _classCallCheck(this, Control);

    return _possibleConstructorReturn(this, _React$Component.call(this, props));
  }

  Control.prototype.render = function render() {
    var name = this.props.name.toLowerCase();
    var nameLabel = name + '-label';
    var decrementLabel = name + '-decrement';
    var incrementLabel = name + '-increment';
    var lengthLabel = name + '-length';
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'control-label' },
        React.createElement(
          'label',
          { id: nameLabel },
          this.props.name
        )
      ),
      React.createElement(
        'div',
        { className: 'control' },
        React.createElement(
          'button',
          { id: decrementLabel,
            onClick: this.props.incDecHandler,
            value: '-' },
          '-'
        ),
        React.createElement(
          'div',
          { id: lengthLabel,
            className: 'control-length' },
          this.props.length
        ),
        React.createElement(
          'button',
          { id: incrementLabel,
            onClick: this.props.incDecHandler,
            value: '+' },
          '+'
        )
      )
    );
  };

  return Control;
}(React.Component);

var Timer = function (_React$Component2) {
  _inherits(Timer, _React$Component2);

  function Timer(props) {
    _classCallCheck(this, Timer);

    return _possibleConstructorReturn(this, _React$Component2.call(this, props));
  }

  Timer.prototype.render = function render() {
    return React.createElement(
      'div',
      { id: 'start_stop', onClick: this.props.startStop,
        style: this.props.startStyle },
      React.createElement(
        'div',
        { id: 'timer-label' },
        this.props.timerType ? 'Session' : 'Break'
      ),
      React.createElement(
        'div',
        { id: 'time-left' },
        this.props.clock
      ),
      React.createElement(
        'button',
        { id: 'reset', onClick: this.props.reset },
        React.createElement('i', { className: 'fa fa-refresh', 'aria-hidden': 'true' })
      )
    );
  };

  return Timer;
}(React.Component);

var sessionBg = '#2ecc71';
var sessionFill = '#27ae60';
var breakBg = '#3498db';
var breakFill = '#2980b9';
var timerBg = sessionBg;
var timerFill = sessionFill;

var Pomodoro = function (_React$Component3) {
  _inherits(Pomodoro, _React$Component3);

  function Pomodoro(props) {
    _classCallCheck(this, Pomodoro);

    var _this3 = _possibleConstructorReturn(this, _React$Component3.call(this, props));

    _this3.state = {
      timerTypeSession: true,
      session: 25,
      break: 5,
      timer: 1500,
      running: false,
      intervalID: -1,
      timerFill: { background: 'linear-gradient(' + timerBg + ' 100%, ' + timerFill + ' 100%)' }
    };
    _this3.handleClickSession = _this3.handleClickSession.bind(_this3);
    _this3.handleClickBreak = _this3.handleClickBreak.bind(_this3);
    _this3.handleClickStartStop = _this3.handleClickStartStop.bind(_this3);
    _this3.handleClickReset = _this3.handleClickReset.bind(_this3);

    _this3.switchTimer = _this3.switchTimer.bind(_this3);
    _this3.convertTime = _this3.convertTime.bind(_this3);
    _this3.checkTime = _this3.checkTime.bind(_this3);
    return _this3;
  }

  Pomodoro.prototype.handleClickSession = function handleClickSession(event) {
    var op = event.target.value;
    var sessionLen = this.state.session;
    var running = this.state.running;

    if (op === '-' && sessionLen > 1 && !running) {
      this.setState({
        session: sessionLen - 1,
        timer: this.state.timer - 60
      });
    } else if (op === '+' && sessionLen < 60 && !running) {
      this.setState({
        session: sessionLen + 1,
        timer: this.state.timer + 60
      });
    }
  };

  Pomodoro.prototype.handleClickBreak = function handleClickBreak(event) {
    var op = event.target.value;
    var breakLen = this.state.break;
    var running = this.state.running;

    if (op === '-' && breakLen > 1 && !running) {
      this.setState({
        break: breakLen - 1
      });
    } else if (op === '+' && breakLen < 60 && !running) {
      this.setState({
        break: breakLen + 1
      });
    }
  };

  Pomodoro.prototype.switchTimer = function switchTimer() {
    var isSession = this.state.timerTypeSession;

    if (isSession) {

      timerBg = sessionBg;
      timerFill = sessionFill;
      this.setState({
        timer: this.state.session * 60,
        intervalID: setInterval(this.checkTime, 1000),
        timerFill: { background: 'linear-gradient(' + timerBg + ' 100%, ' + timerFill + ' 100%)' }

      });
    } else {
      timerBg = breakBg;
      timerFill = breakFill;
      this.setState({
        timer: this.state.break * 60,
        intervalID: setInterval(this.checkTime, 1000),
        timerFill: { background: 'linear-gradient(' + timerBg + ' 100%, ' + timerFill + ' 100%)' }

      });
    }
  };

  Pomodoro.prototype.convertTime = function convertTime() {
    var minutes = Math.floor(this.state.timer / 60);
    var seconds = this.state.timer - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;
  };

  Pomodoro.prototype.checkTime = function checkTime() {

    if (this.state.timer === 0) {
      window.clearInterval(this.state.intervalID);
      this.setState({ timerTypeSession: !this.state.timerTypeSession });
      this.switchTimer();
    } else {
      this.setState({ timer: this.state.timer - 1 });

      var isSession = this.state.timerTypeSession;
      var initTotalSeconds = isSession ? this.state.session * 60 : this.state.break * 60;
      var percentLeft = Math.floor(this.state.timer / initTotalSeconds * 100);

      var attrVal = 'linear-gradient(' + timerBg + ' ' + percentLeft;
      attrVal += '%, ' + timerFill + ' ' + percentLeft + '%)';
      this.setState({ timerFill: { background: attrVal } });

      this.convertTime();
    }
  };

  Pomodoro.prototype.handleClickStartStop = function handleClickStartStop() {
    var running = this.state.running;
    this.setState({ running: !running });

    if (running) {
      console.log('pause');
      window.clearInterval(this.state.intervalID);
    } else {
      this.setState({
        intervalID: setInterval(this.checkTime, 1000)
      });
    }
  };

  Pomodoro.prototype.handleClickReset = function handleClickReset(event) {
    event.stopPropagation();
    console.log('reset');

    timerBg = sessionBg;
    timerFill = sessionFill;
    clearInterval(this.state.intervalID);

    this.setState({
      timerTypeSession: true,
      session: 25,
      break: 5,
      timer: 1500,
      running: false,
      intervalID: -1,
      timerFill: { background: 'linear-gradient(' + timerBg + ' 100%, ' + timerFill + ' 100%)' }
    });
  };

  Pomodoro.prototype.render = function render() {
    return React.createElement(
      'div',
      { id: 'pomodoro-clock' },
      React.createElement(
        'div',
        { id: 'controls' },
        React.createElement(Control, { name: 'session',
          length: this.state.session,
          incDecHandler: this.handleClickSession
        }),
        React.createElement(Control, { name: 'break',
          length: this.state.break,
          incDecHandler: this.handleClickBreak
        })
      ),
      React.createElement(Timer, { timerType: this.state.timerTypeSession,
        sessionLength: this.state.session,
        breakLength: this.state.break,
        clock: this.convertTime(),
        startStop: this.handleClickStartStop,
        reset: this.handleClickReset,

        startStyle: this.state.timerFill
      })
    );
  };

  return Pomodoro;
}(React.Component);

ReactDOM.render(React.createElement(Pomodoro, null), document.getElementById('root'));