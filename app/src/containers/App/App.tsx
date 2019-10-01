import * as React from "react";
import TreeMap from "react-d3-treemap";
import { data } from "../../data/data";
// Be sure to include styles at some point
import "react-d3-treemap/dist/react.d3.treemap.css";

export default class App extends React.Component<{}, {}> {

    public render() {
        return (
            <div className="app-container">
                <TreeMap
                    id="myTreeMap"
                    height={500}
                    width={800}
                    data={data}
                    valueUnit={"MB"}
                    // bgColorRangeLow={"#FFFFBF"}
                    // bgColorRangeHigh={"#91CF60"}
                />
            </div>
        );
    }
}
