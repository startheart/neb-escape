[
    {"type":"stats","clonePar":2,"timePar":10},
    {"type":"wall","x":0,"y":680,"repeat-x":2},
    {"type":"player","x":150,"y": 550},
    {"type":"andGate","inputs":[
        {"type":"lever","x":250,"y": 641},
        {"type":"lever","x":450,"y": 641}
    ], "outputs": [
        {"type":"door", "x":700,"y":218}
    ]},
    {
        "type":"tooltip","x":250,"y":641,"width":100,"height":100,
        "text":"当开关被触起，光线门会打开~"
    },
    {
        "type":"tooltip","x":650,"y":641,"width":50,"height":50,
        "text":"按键 <span class='button c'>C</span> 克隆本体<br/>按键 <span class='button tab'>Tab</span> 可以切换控制本体"
    },
    {"type":"goal","x":890,"y":540}
]