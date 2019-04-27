/**
 * Create a WaveSurfer instance.
 */
var wavesurfer;
// Create an instance of wave surfer with its configuration
document.addEventListener('DOMContentLoaded', function() {
    wavesurfer = WaveSurfer.create({
        container: '#waveform',
        height: 100,
        pixelRatio: 1,
        scrollParent: true,
        normalize: true,
        minimap: true,
        backend: 'MediaElement',
        plugins: [
            WaveSurfer.regions.create(),
            WaveSurfer.minimap.create({
                height: 30,
                waveColor: '#ddd',
                progressColor: '#999',
                cursorColor: '#999'
            }),
            WaveSurfer.timeline.create({
                container: '#wave-timeline'
            })
        ]
    });
   // Load the audio file from your own domain !
    //wavesurfer.load('demo.mp3');
    wavesurfer.load('vsshort.aac');

    wavesurfer.on("ready", function(){
        // Do something when the file has been loaded
//        buttons.play.disabled = false;
        // Do whatever you need to do with the player
        wavesurfer.play();
        wavesurfer.pause();
        wavesurfer.stop();
    });


//    // Store the 3 buttons in some object
//            var buttons = {
//                play: document.getElementById("play"),
//                pause: document.getElementById("pause"),
//                stop: document.getElementById("stop")
//            };
//
//    // Handle Play button
//            buttons.play.addEventListener("click", function(){
//                wavesurfer.play();
//
//                // Enable/Disable respectively buttons
//                buttons.stop.disabled = false;
//                buttons.pause.disabled = false;
//                buttons.play.disabled = true;
//            }, false);
//    // Handle Pause button
//            buttons.pause.addEventListener("click", function(){
//                wavesurfer.pause();
//
//                // Enable/Disable respectively buttons
//                buttons.pause.disabled = true;
//                buttons.play.disabled = false;
//            }, false);
//    // Handle Stop button
//            buttons.stop.addEventListener("click", function(){
//                wavesurfer.stop();
//
//                // Enable/Disable respectively buttons
//                buttons.pause.disabled = true;
//                buttons.play.disabled = false;
//                buttons.stop.disabled = true;
//            }, false);

    /* Regions */

    function onReady(){
       wavesurfer.enableDragSelection({
            color: randomColor(0.1)
        });

        if (localStorage.regions) {
            console.log("onready localStorage.regions");
            loadRegions(JSON.parse(localStorage.regions));

        }
        else {
            // loadRegions(
            //     extractRegions(
            //         wavesurfer.backend.getPeaks(512),
            //         wavesurfer.getDuration()
            //     )
            // );
            console.log("onready wavesurfer.util");
            wavesurfer.util
                .ajax({
                    responseType: 'json',
                    //url: 'annotations.json'
                    url: 'vsshort_annot.json'
                })
                .on('success', function(data) {
                    //console.log("data");
                    loadRegions(data);
                    saveRegions();
                });
        }
    }

    wavesurfer.on('ready', onReady);
    wavesurfer.on('region-click', function(region, e) {
        e.stopPropagation();
        // Play on click, loop on shift click
        e.shiftKey ? region.playLoop() : region.play();
    });
    wavesurfer.on('region-click', editAnnotation);
    wavesurfer.on('region-updated', saveRegions);
    wavesurfer.on('region-removed', saveRegions);
    wavesurfer.on('region-in', showNote);

    wavesurfer.on('region-play', function(region) {
        region.once('out', function() {
            wavesurfer.play(region.start);
            wavesurfer.pause();
        });
    });

    /* Toggle play/pause buttons. */
    var playButton = document.querySelector('#play');
    var pauseButton = document.querySelector('#pause');
    wavesurfer.on('play', function() {
        playButton.style.display = 'none';
        pauseButton.style.display = '';
    });
    wavesurfer.on('pause', function() {
        playButton.style.display = '';
        pauseButton.style.display = 'none';
    });
    // Handle Play button
            playButton.addEventListener("click", function(){
                wavesurfer.play();

                // Enable/Disable respectively buttons
//                buttons.stop.disabled = false;
                // buttons.pause.disabled = false;
                // buttons.play.disabled = true;
            }, false);
    // Handle Pause button
            pauseButton.addEventListener("click", function(){
                wavesurfer.pause();

                // Enable/Disable respectively buttons
                // buttons.pause.disabled = true;
                // buttons.play.disabled = false;
            }, false);

});

    /**
     * Get next region start time.
     */
    function getNextRegStartTime(region){
        console.log(region.id);
        console.log(wavesurfer.regions.list);
        var trigger = false;
        var prevEndTime;
        var prevId;
        for(const key in wavesurfer.regions.list){
            var tempReg = wavesurfer.regions.list[key];
//            console.log(tempReg);
            if(trigger){
                console.log(tempReg.start);
                trigger=false;
                return tempReg.start;
            }

            if(region.id == tempReg.id){
                console.log(tempReg.id);
                //console.log(wavesurfer.regions.list);

                // find previous region and change end time
                Object.keys(wavesurfer.regions.list).map(function(id) {
                    var region = wavesurfer.regions.list[id];
                    //console.log(region.id);
                    if(prevId==region.id){
                        //change end time for previous region
                        //region.end = Math.round(tempReg.start*10)/10;
                        console.log(region.end);
                        region.update({
                            //start: form.elements.start.value,
                            end: Math.round(tempReg.start*10)/10
                        });
                    }
                });
                trigger=true;
            }
            prevId = tempReg.id;
        }


    }
    /**
     * Edit annotation for a region.
     */
    function editAnnotation(region) {
        var form = document.forms.edit;
        form.style.opacity = 1;
        (form.elements.start.value = Math.round(region.start * 10) / 10),
            (form.elements.end.value = getNextRegStartTime(region)); //Math.round(region.end * 10) / 10);
        form.elements.note.value = region.data.note || '';
        form.onsubmit = function(e) {
            e.preventDefault();

//            getNextRegStartTime(region);
            region.update({
                start: form.elements.start.value,
                end: form.elements.end.value,
                data: {
                    note: form.elements.note.value
                }
            });
            form.style.opacity = 0;
        };
        form.onreset = function() {
            form.style.opacity = 0;
            form.dataset.region = null;
        };
        form.dataset.region = region.id;
    }

    /**
     * Save annotations to localStorage.
     */
    function saveRegions() {
//        console.log(Object.keys(wavesurfer.regions.list));
        localStorage.regions = JSON.stringify(

            Object.keys(wavesurfer.regions.list).map(function(id) {
                var region = wavesurfer.regions.list[id];
                return {
                    start: region.start,
                    end: region.end,
                    attributes: region.attributes,
                    data: region.data
                };
            })

        );
    }


    /**
     * Random RGBA color.
     */
    function randomColor(alpha) {
        return (
            'rgba(' +
            [
                ~~(Math.random() * 255),
                ~~(Math.random() * 255),
                ~~(Math.random() * 255),
                alpha || 1
            ] +
            ')'
        );
    }

    /**
     * Load regions from localStorage.
     */
    function loadRegions(regions) {
        var regLen = regions.length;
        console.log("loadRegions(regions)");
        for(var i = 0; i<regLen; i++){
//            console.log(regions[i].start);
            regions[i].color =randomColor(0.1);
            if(i<regLen-1){
                regions[i].end=regions[i+1].start;

            }
            wavesurfer.addRegion(regions[i]);
        }
//        regions.forEach(function(region) {
//            region.color = randomColor(0.1);
//            wavesurfer.addRegion(region);
//        });
    }
    /**
     * Display annotation.
     */
    function showNote(region) {
        if (!showNote.el) {
            showNote.el = document.querySelector('#subtitle');
        }
        showNote.el.textContent = region.data.note || '–';
    }

//    console.log(localStorage.regions);
