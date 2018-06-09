[
    {"type":"stats","clonePar":2,"timePar":15},
    {"type":"wall","x":0,"y":680,"repeat-x":2},
    {"type":"player","x":150,"y": 550},
    {"type":"lever","x":350,"y": 641,"outputs":[
        {"type":"door", "x":500,"y":218},
        {"type":"notGate", "outputs":[
            {"type":"andGate", "outputs":[
                {"type":"door", "x":700,"y":218}
            ],"inputs":[
                {"type":"lever","x":600,"y": 641}
            ]}
        ]}
    ]},
    {
        "type":"tooltip","x":300,"y":641,"width":100,"height":100,
        "text":"正确的开关组合可以开启相应门.<br/>尝试找到正确组合"},
    {
        "type":"tooltip","x":550,"y":641,"width":50,"height":50,
        "text":"按键 <span class='button c'>C</span> 克隆本体<br/>按键 <span class='button tab'>Tab</span> 切换"},
    {"type":"goal","x":890,"y":540}
]