import { getAudioData, linearPath, polarPath } from "./waveform-path.es.js";

async function AudioPath(file) {
    const audioData = await getAudioData(file);
    
    const pathLogo = linearPath(audioData,{ samples: 100,  type: 'steps', top: 20 });
    document.querySelector("#logo path").setAttribute('d', pathLogo);


    const example1 = linearPath(audioData,{ 
        samples: 100, type: 'steps', top: 20,
        paths: [ 
            {d:'L', sx: 0, sy:0, ex:50, ey:100 },
            {d:'L', sx: 50, sy:100, ex:100, ey:0 }
        ]
     });
    document.querySelector("#example1 path").setAttribute('d', example1);

    const example2 = linearPath(audioData,{ 
        samples: 100, type: 'mirror', top: 20, 
        paths: [ 
            {d:'V', sy: 0, x:50, ey:100 }
        ]
     });
    document.querySelector("#example2 path").setAttribute('d', example2);

    const example3 = linearPath(audioData,{ 
        samples: 100, type: 'steps', normalize: true, top: 20,
     });
    document.querySelector("#example3 path").setAttribute('d', example3);

    const example4 = linearPath(audioData,{ 
        samples: 100, type: 'mirror', top: 20,
        paths: [
            {d:'Q', sx: 20, sy:0, x: 50, y: 100, ex:80, ey:0}
        ],
     });
    document.querySelector("#example4 path").setAttribute('d', example4);

    const example5 = linearPath(audioData,{ 
        samples: 75, type: 'mirror', top: 20,
        paths: [
            //Five
            {d:'A', sx: 35, sy:85,  ex:65, ey:85, rx:10, ry: 10, angle: 180, arc: 1, sweep: 1, minshow: 0.8, maxshow: 1, normalize: true},  
            {d:'A', sx: 35, sy:85,  ex:65, ey:85, rx:10, ry: 10, angle: 180, arc: 1, sweep: 0, minshow: 0.8, maxshow: 1, normalize: true},

            {d:'A', sx: 30, sy:70,  ex:70, ey:70, rx:20, ry: 20, angle: 180, arc: 1, sweep: 1, minshow: 0.8, maxshow: 1, normalize: true},
            {d:'A', sx: 30, sy:70,  ex:70, ey:70, rx:20, ry: 20, angle: 180, arc: 1, sweep: 0, minshow: 0.8, maxshow: 1, normalize: true},

            {d:'A', sx: 25, sy:55,  ex:75, ey:55, rx:20, ry: 20, angle: 180, arc: 1, sweep: 1, minshow: 0.8, maxshow: 1, normalize: true},
            {d:'A', sx: 25, sy:55,  ex:75, ey:55, rx:20, ry: 20, angle: 180, arc: 1, sweep: 0, minshow: 0.8, maxshow: 1, normalize: true},

            {d:'A', sx: 20, sy:40,  ex:80, ey:40, rx:20, ry: 20, angle: 180, arc: 1, sweep: 1, minshow: 0.8, maxshow: 1, normalize: true},
            {d:'A', sx: 20, sy:40,  ex:80, ey:40, rx:20, ry: 20, angle: 180, arc: 1, sweep: 0, minshow: 0.8, maxshow: 1, normalize: true},

            {d:'A', sx: 15, sy:20,  ex:85, ey:20, rx:20, ry: 20, angle: 180, arc: 1, sweep: 1, minshow: 0.8, maxshow: 1, normalize: true},
            {d:'A', sx: 15, sy:20,  ex:85, ey:20, rx:20, ry: 20, angle: 180, arc: 1, sweep: 0, minshow: 0.8, maxshow: 1, normalize: true},

            {d:'A', sx: 10, sy:0,  ex:90, ey:0, rx:20, ry: 20, angle: 180, arc: 1, sweep: 1, minshow: 0.8, maxshow: 1, normalize: true},
            {d:'A', sx: 10, sy:0,  ex:90, ey:0, rx:20, ry: 20, angle: 180, arc: 1, sweep: 0, minshow: 0.8, maxshow: 1, normalize: true},

            //Four
            {d:'A', sx: 30, sy:70,  ex:70, ey:70, rx:20, ry: 20, angle: 180, arc: 1, sweep: 1, minshow: 0.6, maxshow: 0.8, normalize: true },
            {d:'A', sx: 30, sy:70,  ex:70, ey:70, rx:20, ry: 20, angle: 180, arc: 1, sweep: 0, minshow: 0.6, maxshow: 0.8, normalize: true },

            {d:'A', sx: 25, sy:55,  ex:75, ey:55, rx:20, ry: 20, angle: 180, arc: 1, sweep: 1, minshow: 0.6, maxshow: 0.8, normalize: true },
            {d:'A', sx: 25, sy:55,  ex:75, ey:55, rx:20, ry: 20, angle: 180, arc: 1, sweep: 0, minshow: 0.6, maxshow: 0.8, normalize: true },

            {d:'A', sx: 20, sy:40,  ex:80, ey:40, rx:20, ry: 20, angle: 180, arc: 1, sweep: 1, minshow: 0.6, maxshow: 0.8, normalize: true },
            {d:'A', sx: 20, sy:40,  ex:80, ey:40, rx:20, ry: 20, angle: 180, arc: 1, sweep: 0, minshow: 0.6, maxshow: 0.8, normalize: true },

            {d:'A', sx: 15, sy:20,  ex:85, ey:20, rx:20, ry: 20, angle: 180, arc: 1, sweep: 1, minshow: 0.6, maxshow: 0.8, normalize: true },
            {d:'A', sx: 15, sy:20,  ex:85, ey:20, rx:20, ry: 20, angle: 180, arc: 1, sweep: 0, minshow: 0.6, maxshow: 0.8, normalize: true },

            {d:'A', sx: 10, sy:0,  ex:90, ey:0, rx:20, ry: 20, angle: 180, arc: 1, sweep: 1, minshow: 0.6, maxshow: 0.8, normalize: true },
            {d:'A', sx: 10, sy:0,  ex:90, ey:0, rx:20, ry: 20, angle: 180, arc: 1, sweep: 0, minshow: 0.6, maxshow: 0.8, normalize: true },

            //Three
            {d:'A', sx: 20, sy:40,  ex:80, ey:40, rx:20, ry: 20, angle: 180, arc: 1, sweep: 1, minshow: 0.4, maxshow: 0.6, normalize: true },
            {d:'A', sx: 20, sy:40,  ex:80, ey:40, rx:20, ry: 20, angle: 180, arc: 1, sweep: 0, minshow: 0.4, maxshow: 0.6, normalize: true },

            {d:'A', sx: 15, sy:20,  ex:85, ey:20, rx:20, ry: 20, angle: 180, arc: 1, sweep: 1, minshow: 0.4, maxshow: 0.6, normalize: true },
            {d:'A', sx: 15, sy:20,  ex:85, ey:20, rx:20, ry: 20, angle: 180, arc: 1, sweep: 0, minshow: 0.4, maxshow: 0.6, normalize: true },

            {d:'A', sx: 10, sy:0,  ex:90, ey:0, rx:20, ry: 20, angle: 180, arc: 1, sweep: 1, minshow: 0.4, maxshow: 0.6, normalize: true },
            {d:'A', sx: 10, sy:0,  ex:90, ey:0, rx:20, ry: 20, angle: 180, arc: 1, sweep: 0, minshow: 0.4, maxshow: 0.6, normalize: true },

            //Two
            {d:'A', sx: 15, sy:20,  ex:85, ey:20, rx:20, ry: 20, angle: 180, arc: 1, sweep: 1, minshow: 0.2, maxshow: 0.4, normalize: true },
            {d:'A', sx: 15, sy:20,  ex:85, ey:20, rx:20, ry: 20, angle: 180, arc: 1, sweep: 0, minshow: 0.2, maxshow: 0.4, normalize: true },

            {d:'A', sx: 10, sy:0,  ex:90, ey:0, rx:20, ry: 20, angle: 180, arc: 1, sweep: 1, minshow: 0.2, maxshow: 0.4, normalize: true },
            {d:'A', sx: 10, sy:0,  ex:90, ey:0, rx:20, ry: 20, angle: 180, arc: 1, sweep: 0, minshow: 0.2, maxshow: 0.4, normalize: true },

            //One
            {d:'A', sx: 25, sy:0,  ex:75, ey:0, rx:20, ry: 20, angle: 180, arc: 1, sweep: 1, minshow: 0, maxshow: 0.2, normalize: true },
            {d:'A', sx: 25, sy:0,  ex:75, ey:0, rx:20, ry: 20, angle: 180, arc: 1, sweep: 0, minshow: 0, maxshow: 0.2, normalize: true },
            
        ],
     });
    document.querySelector("#example5 path").setAttribute('d', example5);

    const example6 = linearPath(audioData,{ 
        samples: 50,  type: 'steps',  top: 20,
        paths: [
            {d:'V', sy:0, x:0, ey:100, },
            {d:'A', sx: 0, sy:100,  ex:100, ey:100, rx:10, ry: 10, angle: 180, arc: 1, sweep: 1},  
            {d:'V', sy:0, x:100, ey:100, },
        ],
     });
    document.querySelector("#example6 path").setAttribute('d', example6);

    const example7 = linearPath(audioData,{ 
        samples: 100, type: 'steps', top: 20,
        paths: [
            {d:'V', sy:0, x:0, ey:100, },
            {d:'A', sx: 0, sy:100,  ex:100, ey:100, rx:10, ry: 10, angle: 180, arc: 1, sweep: 1},  
            {d:'V', sy:100, x:100, ey:0, },
            {d:'A', sx: 100, sy:0,  ex:0, ey:0, rx:10, ry: 10, angle: 180, arc: 1, sweep: 0},
        ],
     });
    document.querySelector("#example7 path").setAttribute('d', example7);

    const example8 = linearPath(audioData,{ 
        samples: 100, type: 'bars', top: 20, 
        paths: [ 
            {d:'V', sy: 0, x:50, ey:100 }
        ]
     });
    document.querySelector("#example8 path").setAttribute('d', example8);

    const example9 = linearPath(audioData,{ 
        samples: 75, type: 'mirror', top: 20, 
        paths: [ 
            {d:'L', sx: 0, sy:20, ex:100, ey:-1.5, normalize: true, minshow: 0, maxshow: 1 },
            {d:'L', sx: -100, sy:40, ex:0, ey:20, normalize: true, minshow: 0.20, maxshow: 1 },
            {d:'L', sx: -200, sy:60, ex:-100, ey:40, normalize: true, minshow: 0.40, maxshow: 1 },
            {d:'L', sx: -300, sy:80, ex:-200, ey:60, normalize: true, minshow: 0.60, maxshow: 1 },
            {d:'L', sx: -400, sy:100, ex:-300, ey:80, normalize: true, minshow: 0.80, maxshow: 1 }
        ]
     });
    document.querySelector("#example9 path").setAttribute('d', example9);


    const example10 = linearPath(audioData,{ 
        samples: 100, type: 'steps', top: 20, animation: true
     });
    document.querySelector("#example10 path animate").setAttribute('values', example10);

    const example11 = linearPath(audioData,{ 
        samples: 100, type: 'bars', top: 20, animation: true,
        paths: [ 
            {d:'V', sy: 0, x:50, ey:100 }
        ]
     });
    document.querySelector("#example11 path animate").setAttribute('values', example11);
    
    // POLAR

    const example12 = polarPath(audioData,{ 
        samples: 90, type: 'steps',
        left: 200, top: 200, distance: 100, length: 50
     });
    document.querySelector("#example12 path").setAttribute('d', example12);

    const example13 = polarPath(audioData,{ 
        samples: 90, type: 'bars',
        left: 200, top: 200, distance: 75, length: 75,
        paths: [
            {d: 'L', sdeg:50, sr:0, edeg: 50, er:100 },
        ]
     });
    document.querySelector("#example13 path").setAttribute('d', example13);

    const example14 = polarPath(audioData,{ 
        samples: 90, type: 'mirror',
        left: 200, top: 200, distance: 100, length: 100
     });
    document.querySelector("#example14 path").setAttribute('d', example14);

    const example15 = polarPath(audioData,{ 
        samples: 90, type: 'steps',
        left: 200, top: 200, distance: 100, length: 100,
        startdeg: 270, enddeg: 90,
        invertdeg: true,
        invertpath: true
     });
    document.querySelector("#example15 path").setAttribute('d', example15);

    const example16 = polarPath(audioData,{ 
        samples: 90, type: 'steps',
        left: 200, top: 200, distance: 100, length: 100,
        paths: [
            {d:'L', sdeg:0, sr:0,  edeg:0, er:90 },
            {d:'A', sdeg:0, sr:90, edeg: 100, er:90, rx: 5, ry: 5, angle: 100, arc: 1, sweep: 1 },
            {d:'L', sdeg:100, sr:90,  edeg:100, er:0 },
        ]
     });
    document.querySelector("#example16 path").setAttribute('d', example16);

    const example17 = polarPath(audioData,{ 
        samples: 90, type: 'steps',
        left: 200, top: 200, distance: 100, length: 100,
        animation: true
     });
    document.querySelector("#example17 path animate").setAttribute('values', example17);


    const example18 = polarPath(audioData,{ 
        samples: 90, type: 'steps',
        left: 200, top: 200, distance: 100, length: 100,
        animation: true,
        paths: [
            {d:'L', sdeg:0, sr:0,  edeg:0, er:90 },
            {d:'A', sdeg:0, sr:90, edeg: 100, er:90, rx: 5, ry: 5, angle: 100, arc: 1, sweep: 1 },
            {d:'L', sdeg:100, sr:90,  edeg:100, er:0 },
        ]
     });
    document.querySelector("#example18 path animate").setAttribute('values', example18);
}
AudioPath("hello_world.ogg");

const element = document.getElementById("startmic")
element.addEventListener("click", startMic);
function startMic() {
    
    navigator.getUserMedia({audio:true}, gotStream, alerterror);
}

function gotStream (stream){
        const context = new AudioContext();
        const source = context.createMediaStreamSource(stream);
        const processor = context.createScriptProcessor(2048, 1, 1);
        source.connect(processor);
        processor.connect(context.destination);

        processor.onaudioprocess = function(e) { 
            const optionsMic1 = {
                samples: 100, type: 'bars', top: 20, 
                normalize: false,
                paths: [ 
                    {d:'V', sy: 0, x:50, ey:100 }
                ]
            };
            const optionsMic2 = {
                samples: 90, type: 'steps',
                left: 200, top: 200, distance: 100, length: 100,
                normalize: false,
                paths: [
                    {d:'L', sdeg:0, sr:0,  edeg:0, er:90 },
                    {d:'A', sdeg:0, sr:90, edeg: 100, er:90, rx: 5, ry: 5, angle: 100, arc: 1, sweep: 1 },
                    {d:'L', sdeg:100, sr:90,  edeg:100, er:0 },
                ]
            };
            const pathMic1 = linearPath(e.inputBuffer,optionsMic1);
            const pathMic2 = polarPath(e.inputBuffer,optionsMic2);
            document.querySelector("#Mic1 path").setAttribute('d', pathMic1);
            document.querySelector("#Mic2 path").setAttribute('d', pathMic2);
        };
}
function alerterror() {
    alert("error");
}