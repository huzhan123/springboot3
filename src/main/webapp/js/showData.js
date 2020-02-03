var myChart = echarts.init(document.getElementById('main'));

    $.get('roomSale/loadRoomPrice').done(function (data) {
        console.log(data.roomNumList);
        console.log(data.roomPriceList);
        myChart.setOption({
            title: {
                text: '各房间销售金额'
            },
            tooltip: {},
            toolbox: {  //工具
                feature: {
                    dataView: {}, //数据视图按钮
                    saveAsImage: {
                        pixelRatio: 3  //保存为图片
                    },
                    restore: {},
                    magicType : {show: true, type: ['line', 'bar']}
                }
            },
            legend: {
                data:['总金额']
            },
            xAxis: {
                data: data.roomNumList
            },
            yAxis: {},
            series: [{
                name: '总金额',
                type: 'bar',
                data: data.roomPriceList
            }]
        });
    });