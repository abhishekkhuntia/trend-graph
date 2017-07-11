#ANGULAR 4 - TREND GRAPH

Light weight Angular 4 Trend graph, this aims at making the graphs with less browser rendering and painting.
>Note: This graph is intended to show only the trend, not the values.

![TREND GRAPH SCREENSHOT](https://image.ibb.co/dm3NVF/trend_graph.png)

##Usage

'import TrendModuleModule' in the `app.module.ts` file.
Use the following in the page:
`<trend-graph [data]="<graph_data>" [baseline]="<graph_Base_Value>" ></trend-graph>`

###DATA
The `data` is to be array of datasets in the following format:
```
[
    {
        data: Array<number>,
        borderColor: string,
        borderWidth: number
    }     
]
```
`borderColor` defines the line color and the `borderWidth` specifies the width of the line.
As mentioned, `data` is an array, we can have multiple line graphs in the same graph.

>Note: As of now the graph is not binded with the change events in data.

###BASELINE
If `baseline` is defined then, the graph makes a horizontal line and makes the strokes below the line of desired color. 
the baseline is to be an object in the below format:

```
{
    yValue: number,
    borderColor: string,
    belowBaseLineColor: string,
    borderWidth: number;
}
```
-`yValue` determines the thresold value for the whole graph.
-`borderColor` determines the line's color.
-`belowBaseLineColor` defines the color of the strokes below the baseline.

> Note: Baseline is optional. If no change in color below the baseline is required then specify the `belowBaseLineColor` same as of the graph's color.

The default value of `belowBaseLineColor` is `red`.



