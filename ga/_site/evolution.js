sort_genomes = function() {
	return population.sort(
		function(first, second) {
			return second.fitness - first.fitness;
		}
	);
}


function update_pop_fitness() {
	//var input_img_data = input_canvas_ctx.getImageData(0,0,img_width,img_height).data;
	var error = 0; 
	//easy to just display the genome and then get the context 
	for(var i = 0; i<population.length; i++) {
		if(population[i].fitness!=0) //don't recalculate the parents
			continue;
		display_genome_for_fitness_test(population[i].genome);
		var genome_img_data = fitness_calc_canvas_ctx.getImageData(0,0,fit_test_width,fit_test_height).data;
		error = 0;
		for(var j = 0; j<fit_test_width*fit_test_height*4; j++) {
			error += (input_img_fit_test_data[j]-genome_img_data[j])*(input_img_fit_test_data[j]-genome_img_data[j]);
		}
		//***needs fixing
		population[i].fitness=1 - error/((fit_test_width*fit_test_height)*(256*256*3+1));
		//document.getElementById("debug").innerHTML = population;
	}

}


function next_generation() {
	sort_genomes();
	var children = [];
	var num_children_per_parent;
	var num_breeding_parents = (percent_to_breed*pop_size)<<0;
	if(kill_parents) {
		num_children_per_parent = (pop_size/num_breeding_parents)<<0;
	} else {
		num_children_per_parent = ((pop_size-num_breeding_parents)/num_breeding_parents)>>0;
		//fill in the children with the parents
		var count = 0;
		while(count<num_breeding_parents) {
			children.push(population[count]);
			count++;
		}
	}
	for(var i = 0; i<num_breeding_parents; i++) {
		//have each parent randomly breed with other parents including themselves
		for(var sexual_encounters = 0; sexual_encounters<num_children_per_parent; sexual_encounters++) {
			second_parent = Math.random()*num_breeding_parents<<0;
			children.push(new offspring(population[i].genome,population[second_parent].genome));

		}
	}
	population=children;
	update_pop_fitness();
}


function init_population() {
	for (var i = 0; i<pop_size; i++) {
		population.push(new offspring());
	}
}


function offspring(parent_genome1, parent_genome2) {
	crossover_point = Math.random()*genome_length<<0;
	var genome = [];
	if(parent_genome1 && parent_genome2) {
		for(var i = 0; i<genome_length; i+=gene_length) {
		    //before the cross over point or uniform and random chance says to take from the first parent
			if ((uni_cross && Math.random()<.5) || (!uni_cross && i<crossover_point)) {
				//document.write("mutation happened");
				//take from first parent
				for(j = 0; j<gene_length; j++) {
				    genome[i+j]=parent_genome1[i+j];
				    if(Math.random()<mutation_chance) {
					    genome[i+j]+=Math.random()*mutation_size*2-mutation_size;
					    if(genome[i+j]<0)
						    genome[i+j]=0;
					    if(genome[i+j]>1)
						    genome[i+j]=1;
				    }
			    }
			}
			else {//after the crossover point or random chance says to take from the second parent
				for(j = 0; j<gene_length; j++) {
				    genome[i+j]=parent_genome2[i+j];
				    if(Math.random()<mutation_chance) {
					    genome[i+j]+=Math.random()*mutation_size*2-mutation_size;
					    if(genome[i+j]<0)
						    genome[i+j]=0;
					    if(genome[i+j]>1)
						    genome[i+j]=1;
				    }
			    }
			}
		}
		this.genome = genome;
	    this.fitness = 0;
    } else {
	    this.genome = get_random_genome();
	    this.fitness = 0;
    }
}

function get_random_genome() {
	var genome = [];
	for(var i = 0; i<genome_length; i++)
	{
		genome[i]=Math.random();
	}
	return genome;
}