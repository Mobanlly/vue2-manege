<template>
    <div class="line1">
        <div id="line1" class="" style="width: 90%;height:450px;"></div>
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    import 'echarts/lib/chart/bar';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';
    import 'echarts/lib/component/toolbox';
    import 'echarts/lib/component/markPoint';
    import 'echarts/lib/component/tooltip';
    export default {
        mounted(){
            this.myChart = echarts.init(document.getElementById('line1'));
            this.initData();
        },
        props: ['sevenDate', 'sevenDay'],
        methods: {
            initData(){
                const colors = ['#5793f3', '#675bba', '#d14a61'];
                const option = {
                    color: colors,
                    title: {
                        text: '走势图',
                        // 副标题文本
                        subtext: ''
                    },
                    tooltip: {
                        //提示框组件
                    // 坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
                        trigger: 'axis'
                    },
                    legend: {
                        //图例组件。
                    // 图例的数据数组。数组项通常为一个字符串，每一项代表一个系列的 name
                        data:['新注册用户', '新增订单', '新增管理员']
                    },
                    toolbox: {
                        show: true, //是否显示工具栏组件。
                        feature: {
                            //各工具配置项
                            dataZoom: {
                                //dataZoom 组件 用于区域缩放，从而能自由关注细节的数据信息，或者概览数据整体，或者去除离群点的影响。
                                yAxisIndex: 'none'
                            },
                            // 动态切换的类型。
                            dataView: {readOnly: false},
                            magicType: {type: ['bar', 'line']},
                             // 配置项还原。
                            restore: {},
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false, //在刻度上标记？
                        data: this.sevenDay
                    },
                    yAxis: [
                        {
                          type: 'value',
                          name: '用户',
                          min: 0,
                           // 坐标轴刻度最大值。
                          max: 200,
                          // y 轴的位置。
                          position: 'left',
                          axisLine: {
                              lineStyle: {
                                  color: '#999'
                              }
                          },
                          axisLabel: {
                              formatter: '{value}'
                          }
                        },
                        {
                          type: 'value',
                          name: '订单',
                          min: 0,
                          max: 200,
                          position: 'right',
                          axisLine: {
                              lineStyle: {
                                  color: '#999'
                              }
                          },
                          axisLabel: {
                              formatter: '{value}'
                          }
                        },
                    ],
                    series: [
                        {
                            name:'新注册用户',
                            type:'line',
                            data:this.sevenDate[0],
                            yAxisIndex: 1,
                            markPoint: {
                                // 图表标注。
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                        },
                        {
                            name:'新增订单',
                            type:'line',
                            data:this.sevenDate[1],
                            yAxisIndex: 1,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                        },
                        {
                            name:'新增管理员',
                            type:'line',
                            data:this.sevenDate[2],
                            yAxisIndex: 1,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                        }
                    ]
              };
                this.myChart.setOption(option);
            }
        },
        watch: {
            sevenDate: function (){
                this.initData()
            },
            sevenDay: function (){
                this.initData()
            }
        }
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .line1{
        display: flex;
        justify-content: center;
    }
</style>
