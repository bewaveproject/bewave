import axios from "axios";
import { init as initScene } from "./scene";
import { init as initSphere } from "./planet";
import Path from "./paths";
import { CURVE_SEGMENTS } from "./constants";
import moment from "moment";

export default function initGlobe(container) {
	//let filteredData;

	initScene(container);
	initSphere();

	// function getUniqueListBy(arr, key) {
	// 	return [...new Map(arr.map((item) => [item[key], item])).values()];
	// }

    // axios
    //     .get("../data/geo_attack_all.json")
	// 	.then((res) => {
	// 		let data = res.data;
	// 		data = getUniqueListBy(data, "predator_longitude");
	// 		data = getUniqueListBy(data, "predator_latitude");
	// 		data = getUniqueListBy(data, "prey_latitude");
	// 		data = getUniqueListBy(data, "prey_longitude");

	// 		filteredData = data.map((attack) => {
	// 			attack.date = moment.unix(attack.timestamp).format("YYYY-MM-D");
	// 			attack.hour = moment.unix(attack.timestamp).format("hh mm ss");
	// 			return attack;
	// 		});

	// 		function filter() {
	// 			const dateStart =
	// 				document.querySelector("#controls .search-date").value +
	// 				" " +
	// 				document.querySelector("#controls .search-date-start").value;
	// 			const dateEnd =
	// 				document.querySelector("#controls .search-date").value +
	// 				" " +
	// 				document.querySelector("#controls .search-date-end").value;

	// 			const epochStart = moment(dateStart).unix();
	// 			const epochEnd = moment(dateEnd).unix();

	// 			return filteredData.filter((attack) => {
	// 				return (
	// 					parseInt(attack.timestamp) >= epochStart &&
	// 					parseInt(attack.timestamp) <= epochEnd
	// 				);
	// 			});
	// 		}

	// 		function filterAndUpdateTotals() {
	// 			const data = filter();
	// 			document.querySelector("#controls .totals").innerHTML = data.length;
	// 		}

	// 		document.querySelector(
	// 			"#controls .search-date"
	// 		).onchange = filterAndUpdateTotals;
	// 		document.querySelector(
	// 			"#controls .search-date-start"
	// 		).onchange = filterAndUpdateTotals;
	// 		document.querySelector(
	// 			"#controls .search-date-end"
	// 		).onchange = filterAndUpdateTotals;

	// 		filterAndUpdateTotals();

	 		let intervalID;

	// 		document.querySelector("#controls .search-button").onclick = function() {
	// 			clearInterval(intervalID);
	// 			const data = filter();

				// const coords = data.map((attack) => {
				// 	const startLat = attack.predator_latitude;
				// 	const startLng = attack.predator_longitude;
				// 	const endLat = attack.prey_latitude;
				// 	const endLng = attack.prey_longitude;
				// 	return [startLat, startLng, endLat, endLng];
				// });

    var pathStep = 0;
    const coords = [10 , 0, 50, 50]
    const paths = new Path(coords)
    paths.destroyPaths()

    intervalID = setInterval(() => {
        pathStep++;
        paths.animate(pathStep)

        if (pathStep > CURVE_SEGMENTS) {
            clearInterval(intervalID)
        }
    }, 10);
		//	}
		//})
		// .catch((err) => {
		// 	console.log(err);
		// });
}