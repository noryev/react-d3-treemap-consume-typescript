import * as React from "react";
import TreeMap, {
    ColorModel,
    NumberOfChildrenPlacement,
} from "react-d3-treemap";
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
                    width={1000}
                    data={data}
                    valueUnit={"MB"}
                    colorModel={ColorModel.OneEachChildren}
                    paddingInner={3}
                    nodeStyle={{ paddingLeft: 5, paddingRight: 5 }}
                    numberOfChildrenPlacement={
                        NumberOfChildrenPlacement.BottomRight
                    }
                    onTreeMapDidMount={(tm) => console.log(tm.getZoomLevel())}
                />
            </div>
        );
    }
}
