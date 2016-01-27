
var img_width=200;
var img_height=200;

var fit_test_width = 50;
var fit_test_height = 50;
var uni_cross = false;

var percent_to_breed;
var kill_parents = false;
var pop_size;

var num_shapes;
var points_per_shape;
var mutation_size;
var mutation_chance;

var genome_length; 
var gene_length; //Each "gene" codes for one polygon. The size of the gene depends on the number of points per polygon. 
var population = [];

var input_canvas;
var input_canvas_ctx;
var output_canvas;
var output_canvas_ctx;
var output_stats;
var fitness_calc_canvas;
var fitness_calc_canvas_ctx;
var input_img_fit_test_data;

var timer;
var start_time;

var $ = function(id) {return document.getElementById(id);};

var input_image_data = []; //the rgba values for each pixel of the input image


function write_stats() {
	var args = [];
	output_stats.value ="";
	for (var i=0;i<arguments.length;i++)
		output_stats.value+= arguments[i]+"\r\n";
}

function swap_input_img() {
	var img_selection = $("img_selection");
	var src = img_selection.options[img_selection.selectedIndex].value;
	$("input_img").onload = setup_input_img;
	$("input_img").src = src;
}

window.onload = function() {
	//document.getElementById("debug").innerHTML = "hiiii";
	output_stats = $("output_stats");
	output_canvas = $("output_canvas");
	output_canvas_ctx = output_canvas.getContext("2d");
	setup_input_img();
	output_canvas.width = img_width;
	output_canvas.height = img_height;
	output_canvas.style.width = img_width+"px";
	output_canvas.style.height = img_height+"px";
	$("start_button").disabled = false;
}


function setup_input_img() {
	input_canvas = $("input_canvas");
	input_canvas.style.width = img_width+"px";
	input_canvas.style.height = img_height+"px";
	if (!input_canvas.getContext) return;
	input_canvas_ctx = input_canvas.getContext("2d");
	if (!input_canvas_ctx.getImageData) return;
	input_canvas.width = img_width;
    input_canvas.height = img_height;
    input_canvas_ctx.drawImage($("input_img"),0,0);
	var input_image_data = input_canvas_ctx.getImageData(0,0,img_width,img_height).data;	
	//it makes it easy to calculate the fitness of genomes by displaying
	//them on an auxiliary canvas. we can't display them on the output canvas because
	//doing so would draw over the most fit genome
	fitness_calc_canvas = $("fitness_calc_canvas");
	fitness_calc_canvas.style.width=fit_test_width+"px";
	fitness_calc_canvas.style.height=fit_test_height+"px";
	fitness_calc_canvas_ctx=fitness_calc_canvas.getContext("2d");
	fitness_calc_canvas.width = fit_test_width;
	fitness_calc_canvas.height = fit_test_height;
	//cache the test data
	var input_img_fit_test=fitness_calc_canvas_ctx.drawImage($("input_img"),0,0,fit_test_width,fit_test_height);
	input_img_fit_test_data=fitness_calc_canvas_ctx.getImageData(0,0,fit_test_width,fit_test_height).data;
	fitness_calc_canvas_ctx.clearRect(0,0,fit_test_width,fit_test_height);
}


function display_genome(genome) {
	output_canvas_ctx.clearRect (0, 0, img_width, img_height);
	//output_canvas_ctx.fillStyle = "white";
	//output_canvas_ctx.fillRect(0,0,img_width,img_height);
	for(var i = 0; i<genome_length; i+=gene_length) {	
		//document.getElementById("debug").innerHTML = genome
		output_canvas_ctx.beginPath();
		//move to first point
		output_canvas_ctx.moveTo(genome[i+4]*img_width, genome[i+5]*img_height);
		//iteratively draw all other points
		for(var j = 0; j < points_per_shape-1; j++) {
			output_canvas_ctx.lineTo(genome[j*2+i+6]*img_width,
				genome[j*2+i+6+1]*img_height);
		}
		output_canvas_ctx.closePath();
		output_canvas_ctx.fillStyle = "rgba(" + ((genome[i]*255)>>0) + "," 
			+ ((genome[i+1]*255)>>0) + "," + ((genome[i+2]*255)>>0) + "," 
			+ genome[i+3] + ")";
	    output_canvas_ctx.fill();
	}
}

//used by the fitness calculation only
function display_genome_for_fitness_test(genome) {
	fitness_calc_canvas_ctx.clearRect (0, 0, fit_test_width, fit_test_height);
	//fitness_calc_canvas_ctx.fillStyle = "black";
	//fitness_calc_canvas_ctx.fillRect(0,0,img_width,img_height);
	for(var i = 0; i<genome_length; i+=gene_length) {	
		//document.getElementById("debug").innerHTML = genome
		fitness_calc_canvas_ctx.beginPath();
		//move to first point
	    
		fitness_calc_canvas_ctx.moveTo(genome[i+4]*fit_test_width, genome[i+5]*fit_test_height);
		//iteratively draw all other points
		for(var j = 0; j<points_per_shape-1; j++) {
			fitness_calc_canvas_ctx.lineTo(genome[j*2+i+6]*fit_test_width,
				genome[j*2+i+6+1]*fit_test_height);
		}
		fitness_calc_canvas_ctx.closePath();
		fitness_calc_canvas_ctx.fillStyle = "rgba(" + ((genome[i]*255)>>0) + "," 
			+ ((genome[i+1]*255)>>0) + "," + ((genome[i+2]*255)>>0) + "," 
			+ genome[i+3] + ")";
	    fitness_calc_canvas_ctx.fill();
	}
}


//*** need to check inputs
function start() {
	if(timer)
	{
		clearTimeout(timer);
		timer = 0;
	}
	start_time = new Date().getTime();

	pop_size = parseInt($("pop_size").value,10);
	if(pop_size<=1)
	{
		pop_size=2;
	}
	if(pop_size>10000)
	{
		pop_size=10000;
	}
	num_shapes = parseInt($("num_shapes").value,10);
	if(num_shapes<=0)
	{
		num_shapes = 1;
	}
	if(num_shapes>10000)
	{
		num_shapes = 10000;
	}
	points_per_shape = parseInt($("points_per_shape").value,10);
	if(points_per_shape<3)
	{
		points_per_shape=3;
	}

    mutation_chance = parseFloat($("mutation_chance").value,10);
    mutation_size = parseFloat($("mutation_size").value,10);

	//still need to display invalid rates on output stats
	if(mutation_size>1 || mutation_size<0) 
	{
		mutation_size = .1;
	}
	if(mutation_chance>1 || mutation_chance<0)
	{
		mutation_chance = .02;
	}
	//each shape has 2 coordinates per point + 4 values for rgba
	gene_length = (4+points_per_shape*2);
	genome_length = gene_length * num_shapes;

	uni_cross = $("uni_cross").checked;
	kill_parents=$("kill_parents").checked;
	percent_to_breed = parseFloat($("percent_to_breed").value,10);

	if(percent_to_breed>1 || percent_to_breed<0)
	{
		percent_to_breed=.25;
	}

	init_population();
	var num_generations = 0;

	//updates the population and continually runs
	function next_generation_shell()
	{

		next_generation();
		num_generations++;
		var best_genome = sort_genomes()[0];
		var run_time = ((new Date().getTime() - start_time) / 1000);
		
		//output stats and update image every 1 generations
		if(num_generations%1==0)
		{
			display_genome(best_genome.genome);
		    //document.getElementById("debug").innerHTML = best_genome;
			//call function to get shape type

			write_stats(
				"Size of population: " + population.length,
				"Number of shapes: " + num_shapes + " " + points_per_shape + "-sided shapes",
				"Breeding from top " + (percent_to_breed*100) + "% of population",
				(kill_parents ? "parents killed after breeding" : "parents carried over to next generation"),
				"Generation: " + num_generations, 
				"Most fit genome fitness: " + (best_genome.fitness * 100).toFixed(4) + "%",
				"Time per generation: " + (run_time / num_generations).toFixed(2),
				"Total Time: " + run_time.toFixed(2)
			);

		}
		timer = setTimeout(next_generation_shell,10);
	}
	next_generation_shell();

}

//function to get shape type

function stop()
{
	clearTimeout(timer);
}
