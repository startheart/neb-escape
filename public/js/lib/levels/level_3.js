[
    {"type":"stats","clonePar":1,"timePar":15},
    {"type":"wall","x":0,"y":680,"repeat-x":2},
    {"type":"player","x":150,"y": 550},
    {"type":"lever","x":350,"y": 641,"outputs":[
        {"type":"door", "x":500,"y":218},
        {"type":"notGate", "outputs":[
            {"type":"door", "x":700,"y":218}
        ]}
    ]},
    {
        "type":"tooltip","x":300,"y":641,"width":100,"height":100,
        "text":"按键 <span class='button e'>E</span> \/ <span class='button enter'>Enter</span> 控制开关<br>有些开关闭合 才能开启门"},
    {
        "type":"tooltip","x":550,"y":641,"width":50,"height":50,
        "text":"按键 <span class='button c'>C</span> 克隆本体<br/>按键 <span class='button tab'>Tab</span> 切换本体"},
    {"type":"goal","x":890,"y":540}
]