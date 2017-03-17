var fillScatteredTimeScaleDataPlugin = {
	beforeUpdate: function(c) {
		var timeAxis = c.options.scales.xAxes[0].time;
		if (!timeAxis || !timeAxis.fillGapsWithZero) return;
		for (var i=0;i<c.data.datasets.length;i++){
			var set = c.data.datasets[i];
			if (!set.data.length) continue;
			var min, max, hash = {};
			for (var j=0;j<set.data.length;j++){
				var val = moment(set.data[j].x, timeAxis.parser);
				if (!min || min.diff(val)>0)
					min = val;
				if (!max || max.diff(val)<0)
					max = val;
				hash[set.data[j].x] = 1;
			}
			for (var val = min; max.diff(val)>0; val.add(1, timeAxis.minUnit)){
				var d = val.format(timeAxis.parser);
				if (!hash[d])
					set.data.push({x:d, y:0});
			}
			set.data.sort(function(a,b){
				return a.x < b.x?-1:1;
			});
		}
	}
}

Chart.pluginService.register(fillScatteredTimeScaleDataPlugin); 
