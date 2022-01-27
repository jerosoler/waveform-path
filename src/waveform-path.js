export const getAudioData = (url) => {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    return fetch(url)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
    .catch(error => {
        console.error(error);
    });
};

export const linearPath = (audioBuffer, options) => {
    const { 
        channel = 0,
        samples = audioBuffer.length,
        height = 100,
        width = 800,
        top = 0,
        left = 0,
        type = 'steps',
        paths = [{d:'Q', sx: 0, sy:0, x: 50, y: 100, ex:100, ey:0}],
        animation = false,
        animationframes = 10,
        normalize = true,
        } = options;

    const framesData = getFramesData(audioBuffer, channel, animation, animationframes);
    const filteredData = getFilterData(framesData, samples);
    const normalizeData = (normalize ? getNormalizeData(filteredData) : filteredData);

    let path = ``;
    

    const fixHeight = (type != 'bars' ?  (height+top*2) / 2 : height+top);
    const fixWidth = width / samples;
    const pathslength = paths.length;
    const fixpathslength =  (type == 'mirror' ? pathslength*2 : pathslength);

    const normalizeDataLength = normalizeData.length;

    for(let f = 0; f < normalizeDataLength; f++) {
        if(f>0) {
            const pathlength = path.length;
            const lastvalue = path.charAt(pathlength - 1);
            if(lastvalue == ";" || pathlength === 0) {
                path+=' M 0 0 ;';
            } else {
                path += ';';
            }
        }
        
        let last_pos_x = -9999;
        let last_pos_y = -9999;
        
        for (let i = 0; i < samples; i++) {

            const positive =  (type != 'bars' ? (i % 2 ? 1: -1) : 1);
            let mirror = 1;
            for(let j = 0; j < fixpathslength; j++) {
                let k = j;
                if(j >= pathslength) {
                    k = j - pathslength;
                    mirror = -1;   
                }
                paths[k].minshow = paths[k].minshow ?? 0;
                paths[k].maxshow = paths[k].maxshow ?? 1;
                paths[k].normalize = paths[k].normalize ?? false;
                const normalizeDataValue = (paths[k].normalize ? 1 : normalizeData[f][i]);
                if(paths[k].minshow <= normalizeData[f][i] && paths[k].maxshow >= normalizeData[f][i]) {
                    switch (paths[k].d) {
                        // LineTo Commands
                        case 'L': {
                            const pos_x = (i * fixWidth)  + (fixWidth*paths[k].sx/100) + left;
                            const pos_y = fixHeight + (normalizeDataValue * paths[k].sy / 100 * (type != 'bars' ? height/2 : height) * -positive*mirror);

                            //const end_pos_x = ((i+1) * fixWidth) - (fixWidth*(1-(paths[k].ex/100))) + left;
                            const end_pos_x = (i*fixWidth) + (fixWidth*paths[k].ex/100) + left;
                            const end_pos_y = fixHeight + (normalizeDataValue * paths[k].ey / 100 * (type != 'bars' ? height/2 : height) * -positive*mirror);

                            if(pos_x !== last_pos_x || pos_y !== last_pos_y) {   
                                path += `M ${pos_x} ${pos_y} `;
                            }

                            path += `L ${end_pos_x} ${end_pos_y} `; 
                            
                            last_pos_x = end_pos_x;
                            last_pos_y = end_pos_y;                             
                            break;
                        }

                        case 'H': {
                            const pos_x = (i * fixWidth)  + (fixWidth*paths[k].sx/100) + left;
                            const pos_y = fixHeight + (normalizeDataValue * paths[k].y / 100 * (type != 'bars' ? height/2 : height) * -positive*mirror);

                            //const end_pos_x = ((i+1) * fixWidth) - (fixWidth*(1-(paths[k].ex/100))) + left;
                            const end_pos_x = (i*fixWidth) + (fixWidth*paths[k].ex/100) + left;
                            const end_pos_y = pos_y;

                            if(pos_x !== last_pos_x || pos_y !== last_pos_y) {   
                                path += `M ${pos_x} ${pos_y} `;
                            }

                            path += `H ${end_pos_x} `; 
                            
                            last_pos_x = end_pos_x;
                            last_pos_y = end_pos_y;                             
                            break;
                        }
                        
                        case 'V': {
                            const pos_x = (i * fixWidth)  + (fixWidth*paths[k].x/100) + left;
                            const pos_y = fixHeight + (normalizeDataValue * paths[k].sy / 100 * (type != 'bars' ? height/2 : height) * -positive*mirror);
                            
                            const end_pos_x = pos_x;
                            const end_pos_y = fixHeight + (normalizeDataValue * paths[k].ey / 100 * (type != 'bars' ? height/2 : height) * -positive*mirror);
                            
                            if(pos_x !== last_pos_x || pos_y !== last_pos_y) {   
                                path += `M ${pos_x} ${pos_y} `;
                            }
                            
                            path += `V ${end_pos_y} `; 

                            last_pos_x = end_pos_x;
                            last_pos_y = end_pos_y;
                            break;
                        }

                        // Cubic Bézier Curve Commands
                        case 'C': {
                            const pos_x = (i * fixWidth)  + (fixWidth*paths[k].sx/100) + left;
                            const pos_y = fixHeight  - (fixHeight*paths[k].sy/100)*positive;
                            
                            const center_pos_x = (i * fixWidth)  + (fixWidth*paths[k].x/100) + left;
                            const center_pos_y = fixHeight + (normalizeDataValue * paths[k].y / 100 * (type != 'bars' ? height : height*2) * -positive*mirror);

                            //const end_pos_x = ((i+1) * fixWidth) - (fixWidth*(1-(paths[k].ex/100))) + left;
                            const end_pos_x = (i*fixWidth) + (fixWidth*paths[k].ex/100) + left;
                            const end_pos_y = fixHeight - (fixHeight*paths[k].ey/100)*positive;

                            if(pos_x !== last_pos_x || pos_y !== last_pos_y) {   
                                path += `M ${pos_x} ${pos_y} `;
                            }

                            path += `C ${pos_x} ${pos_y} ${center_pos_x} ${center_pos_y} ${end_pos_x} ${end_pos_y} `; 

                            last_pos_x = end_pos_x;
                            last_pos_y = end_pos_y;
                            break;
                        }

                        // Quadratic Bézier Curve Commands
                        case 'Q': {
                            const pos_x = (i * fixWidth)  + (fixWidth*paths[k].sx/100) + left;
                            const pos_y = fixHeight + (normalizeDataValue * paths[k].sy / 100 * (type != 'bars' ? height/2 : height) * -positive*mirror);

                            const center_pos_x = (i * fixWidth)  + (fixWidth*paths[k].x/100) + left;
                            const center_pos_y = fixHeight + (normalizeDataValue * paths[k].y / 100 * (type != 'bars' ? height : height*2) * -positive*mirror);

                            //const end_pos_x = ((i+1) * fixWidth) - (fixWidth*(1-(paths[k].ex/100))) + left;
                            const end_pos_x = (i*fixWidth) + (fixWidth*paths[k].ex/100) + left;
                            const end_pos_y = fixHeight + (normalizeDataValue * paths[k].ey / 100 * (type != 'bars' ? height/2 : height) * -positive*mirror);

                            if(pos_x !== last_pos_x || pos_y !== last_pos_y) {   
                                path += `M ${pos_x} ${pos_y} `;
                            }

                            path += `Q ${center_pos_x} ${center_pos_y} ${end_pos_x} ${end_pos_y} `; 
                            
                            last_pos_x = end_pos_x;
                            last_pos_y = end_pos_y;                             
                            break;
                        }

                        // Elliptical Arc Curve Commands
                        case 'A': {
                            const pos_x = (i * fixWidth)  + (fixWidth*paths[k].sx/100) + left;
                            const pos_y = fixHeight + (normalizeDataValue * paths[k].sy / 100 * (type != 'bars' ? height/2 : height) * -positive*mirror);

                            //const end_pos_x = ((i+1) * fixWidth) - (fixWidth*(1-(paths[k].ex/100))) + left;
                            const end_pos_x = (i*fixWidth) + (fixWidth*paths[k].ex/100) + left;
                            const end_pos_y = fixHeight + (normalizeDataValue * paths[k].ey / 100 * (type != 'bars' ? height/2 : height) * -positive*mirror);

                            if(pos_x !== last_pos_x || pos_y !== last_pos_y) {   
                                path += `M ${pos_x} ${pos_y} `;
                            }
                            const rx = paths[k].rx * fixWidth/100;
                            const ry = paths[k].ry * fixWidth/100;
                            let sweep = paths[k].sweep;
                            if(positive == -1) {
                                if(sweep == 1) {
                                    sweep = 0;
                                } else {
                                    sweep = 1;
                                }
                            }
                            if(mirror == -1) {
                                if(sweep == 1) {
                                    sweep = 0;
                                } else {
                                    sweep = 1;
                                }
                            }
                            path += `A ${rx} ${ry} ${paths[k].angle} ${paths[k].arc} ${sweep} ${end_pos_x} ${end_pos_y} `; 
                            
                            last_pos_x = end_pos_x;
                            last_pos_y = end_pos_y;                             
                            break;
                        }

                        // ClosePath Commands
                        case 'Z': 
                            path += 'Z ';    
                            break;

                        default:
                            break;
                    }
                }
            }       
        }
    }
    return path;
}

export const polarPath = (audioBuffer, options) => {
    const { 
        channel = 0,
        samples = audioBuffer.length,
        distance = 50,
        length = 100,
        top = 0,
        left = 0,
        type = 'steps',
        startdeg = 0,
        enddeg = 360,
        invertdeg = false,
        invertpath = false,
        paths = [{d:'Q', sdeg: 0, sr:0, deg: 50, r: 100, edeg:100, er:0}],
        animation = false,
        animationframes = 10,
        normalize = true,
        } = options;
    
    const framesData = getFramesData(audioBuffer, channel, animation, animationframes);
    const filteredData = getFilterData(framesData, samples);
    const normalizeData = (normalize ? getNormalizeData(filteredData) : filteredData);

    let path = ``;
    const fixenddeg = (enddeg < startdeg ? enddeg+360 : enddeg);
    const deg = (!invertdeg ? (fixenddeg-startdeg) / samples : (startdeg-fixenddeg) / samples );
    const fixOrientation = (!invertdeg ? 90+startdeg : 90+startdeg+180 );
    const invert = (!invertpath ? 1 : -1);
    const pathslength = paths.length;
    const fixpathslength =  (type == 'mirror' ? pathslength*2 : pathslength);
    const pi180 = Math.PI / 180;

    const normalizeDataLength = normalizeData.length;

    for(let f = 0; f < normalizeDataLength; f++) {
        if(f>0) {
            const pathlength = path.length;
            const lastvalue = path.charAt(pathlength - 1);
            if(lastvalue == ";" || pathlength === 0) {
                path+=' M 0 0 ;';
            } else {
                path += ';';
            }
        }       

        let last_pos_x = -9999;
        let last_pos_y = -9999;
        
        for (let i = 0; i < samples; i++) {
            const positive =  (type != 'bars' ? (i % 2 ? 1: -1) : 1);
            let mirror = 1;
            for(let j = 0; j < fixpathslength; j++) {
                let k = j;
                if(j >= pathslength) {
                    k = j - pathslength;
                    mirror = -1;   
                }
                paths[k].minshow = paths[k].minshow ?? 0;
                paths[k].maxshow = paths[k].maxshow ?? 1;
                paths[k].normalize = paths[k].normalize ?? false;
                const normalizeDataValue = (paths[k].normalize ? 1 : normalizeData[f][i]);
                if(paths[k].minshow <= normalizeData[f][i] && paths[k].maxshow >= normalizeData[f][i]) {
                    switch (paths[k].d) {
                        // LineTo Commands
                        case 'L': {
                            const angleStart =  ((deg*(i+paths[k].sdeg/100)) - fixOrientation) * pi180;
                            const angleEnd =  ((deg*(i+paths[k].edeg/100)) - fixOrientation) * pi180;

                            const pos_x = left + ((length*(paths[k].sr/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.cos(angleStart);
                            const pos_y = top + ((length*(paths[k].sr/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.sin(angleStart);

                            const end_pos_x = left + ((length*(paths[k].er/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.cos(angleEnd);
                            const end_pos_y = top + ((length*(paths[k].er/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.sin(angleEnd);

                            if(pos_x !== last_pos_x || pos_y !== last_pos_y) {   
                                path += `M ${pos_x} ${pos_y} `;
                            }

                            path += `L ${end_pos_x} ${end_pos_y} `; 
                            
                            last_pos_x = end_pos_x;
                            last_pos_y = end_pos_y;                             
                            break;
                        }


                        // Cubic Bézier Curve Commands
                        case 'C': {
                            const angleStart =  ((deg*(i+paths[k].sdeg/100)) - fixOrientation) * pi180;
                            const angle =  ((deg*(i+paths[k].deg/100)) - fixOrientation) * pi180;
                            const angleEnd =  ((deg*(i+paths[k].edeg/100)) - fixOrientation) * pi180;

                            const pos_x = left + ((length*(paths[k].sr/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.cos(angleStart);
                            const pos_y = top + ((length*(paths[k].sr/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.sin(angleStart);
                            
                            const center_pos_x = left + ((length*(paths[k].r/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.cos(angle);
                            const center_pos_y = top + ((length*(paths[k].r/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.sin(angle);

                            const end_pos_x = left + ((length*(paths[k].er/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.cos(angleEnd);
                            const end_pos_y = top + ((length*(paths[k].er/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.sin(angleEnd);

                            if(pos_x !== last_pos_x || pos_y !== last_pos_y) {   
                                path += `M ${pos_x} ${pos_y} `;
                            }

                            path += `C ${pos_x} ${pos_y} ${center_pos_x} ${center_pos_y} ${end_pos_x} ${end_pos_y} `; 

                            last_pos_x = end_pos_x;
                            last_pos_y = end_pos_y;
                            break;
                        }

                        // Quadratic Bézier Curve Commands
                        case 'Q': {
                            const angleStart =  ((deg*(i+paths[k].sdeg/100)) - fixOrientation) * pi180;
                            const angle =  ((deg*(i+paths[k].deg/100)) - fixOrientation) * pi180;
                            const angleEnd =  ((deg*(i+paths[k].edeg/100)) - fixOrientation) * pi180;

                            const pos_x = left + ((length*(paths[k].sr/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.cos(angleStart);
                            const pos_y = top + ((length*(paths[k].sr/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.sin(angleStart);
                            
                            const center_pos_x = left + ((length*(paths[k].r/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.cos(angle);
                            const center_pos_y = top + ((length*(paths[k].r/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.sin(angle);

                            const end_pos_x = left + ((length*(paths[k].er/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.cos(angleEnd);
                            const end_pos_y = top + ((length*(paths[k].er/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.sin(angleEnd);


                            if(pos_x !== last_pos_x || pos_y !== last_pos_y) {   
                                path += `M ${pos_x} ${pos_y} `;
                            }

                            path += `Q ${center_pos_x} ${center_pos_y} ${end_pos_x} ${end_pos_y} `; 
                            
                            last_pos_x = end_pos_x;
                            last_pos_y = end_pos_y;                             
                            break;
                        }

                        // Elliptical Arc Curve Commands
                        case 'A': {
                            const angleStart =  ((deg*(i+paths[k].sdeg/100)) - fixOrientation) * pi180;
                            const angleEnd =  ((deg*(i+paths[k].edeg/100)) - fixOrientation) * pi180;

                            const pos_x = left + ((length*(paths[k].sr/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.cos(angleStart);
                            const pos_y = top + ((length*(paths[k].sr/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.sin(angleStart);

                            const end_pos_x = left + ((length*(paths[k].er/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.cos(angleEnd);
                            const end_pos_y = top + ((length*(paths[k].er/100)*normalizeDataValue)* positive*mirror*invert + distance) * Math.sin(angleEnd);

                            if(pos_x !== last_pos_x || pos_y !== last_pos_y) {   
                                path += `M ${pos_x} ${pos_y} `;
                            }

                            const angle = deg * i * paths[k].angle / 100;
                            const rx = paths[k].rx * deg/100;
                            const ry = paths[k].ry * deg/100;

                            let sweep = paths[k].sweep;
                            if(positive == -1) {
                                if(sweep == 1) {
                                    sweep = 0;
                                } else {
                                    sweep = 1;
                                }
                            }
                            if(mirror == -1) {
                                if(sweep == 1) {
                                    sweep = 0;
                                } else {
                                    sweep = 1;
                                }
                            }
                            path += `A ${rx} ${ry} ${angle} ${paths[k].arc} ${sweep} ${end_pos_x} ${end_pos_y} `; 
                            
                            last_pos_x = end_pos_x;
                            last_pos_y = end_pos_y;                             
                            break;
                        }

                        // ClosePath Commands
                        case 'Z': 
                            path += 'Z ';    
                            break;

                        default:
                            break;
                    }
                }
            }       
        }
    }
    return path;
}

const getFramesData = (audioBuffer, channel, animation, animationframes) => {
    const rawData = audioBuffer.getChannelData(channel);
    
    const framesData = [];
    if(animation) {
        const frames = audioBuffer.sampleRate / animationframes;
        for (let index = 0; index < rawData.length; index += frames) {
            const partraw = rawData.slice(index, index+frames);
            framesData.push(partraw);
        }
    } else {
        framesData.push(rawData);
    }

    return framesData;
}

const getFilterData = (framesData, samples) => {
    const filteredData = [];
    const framesDataLength = framesData.length;
    for(let f = 0; f < framesDataLength; f++) {
        const blockSize = Math.floor(framesData[f].length / samples); // the number of samples in each subdivision
        const filteredDataBlock = [];
        for (let i = 0; i < samples; i++) {
            let blockStart = blockSize * i; // the location of the first sample in the block
            let sum = 0;
            for (let j = 0; j < blockSize; j++) {
                sum = sum + Math.abs(framesData[f][blockStart + j]); // find the sum of all the samples in the block
            }
            filteredDataBlock.push(sum / blockSize); // divide the sum by the block size to get the average
        }
        filteredData.push(filteredDataBlock);
    }
    return filteredData;   
}

const getNormalizeData = (filteredData) => {
    const multipliers = [];
    const filteredDataLength = filteredData.length
    for(let i = 0; i < filteredDataLength; i++) {
        const multiplier = Math.max(...filteredData[i]);
        multipliers.push(multiplier);
    }
    const maxMultiplier = Math.pow(Math.max(...multipliers), -1);

    const normalizeData = [];
    for(let i = 0; i < filteredDataLength; i++) {
        const normalizeDataBlock = filteredData[i].map(n => n * maxMultiplier);
        normalizeData.push(normalizeDataBlock);
    }
    return normalizeData;
}