## Component works as a role

We consider all the single component we designed works as a kind of role, one role takes input in and turn back output. This idea makes the responsibility of component more simple and clear, possible to avoid building duplicated components and supports component under the same role to change its theme without worrying about breaking the behavior outside.

We have made a list of roles in 3 categories, and each component implements a role below:

[`() => Output`](/component/output) :  takes no explicit input (or the input is made by human being), generates a kind of data as output

* `role=text`: `() => String`
* `role=textarea`: `() => MultiLineString`
* `role=number`: `() => Number`
* `role=number-text`: `() => String` in which output match `[1-9\*\# ]`
* `role=date`: `() => Timestamp` in which `(output - offset) % (ms in a day) is equal to 0`
* `role=time`: `() => Timestamp`
* `role=file`: `() => File`
* `role=file-url`: `() => FileUrl`
* `role=image`: `() => ImageFile`
* `role=image-url`: `() => ImageUrl`
* `role=code`: `() => CodeString`
* `role=md`: `() => MdString`
* `role=string-list`: `() => StringList`
* `role=number-list`: `() => NumberList`
* `role=switch`: `() => Boolean`

[`Input => View`](/component/view): takes input data and generates a view rendering on screen

* `role=text-view`: `String => StringView`
* `role=image-view`: `ImageUrl => ImageView`
* `role=code-view`: `CodeString => CodeView`
* `role=md-view`: `MdString => MdView`
* `role=info-view`: `InfoMap => InfoView`
* `role=card-view`: `CardMap => CardView` (meet some  specific field requirements)
* `role=list-view`: `List => ListView` (meet some  weak field requirements)
* `role=card-list-view`: `CardList => CardListView` (meet some specific field requirements)
* `role=table-view`: `RecordList => TableView`
* `role=tree-view`: `Tree => TreeView`
* `role=chart-view`: `ChartData => ChartView`

[`Input => Output`](/component/in-out): takes input data and generates output data

* `role=select`: `Map => String`
* `role=multi-select`: `List => List`
* `role=cascader-select`: `TreeList => List`
* `role=parallel-select`: `Lists => List`

## Component combination

You may have already notice that some of roles above can take ones output as its own input data, so it's easy to compose them together.

For instance, you can take `() => MdString` and `MdString => MdView` as one combination role, so from the outside perspective, the whole things work as a `() => MdView`. In this process of combination, you don't know the detail mechanism of independent role, but the combination result works as expected.
