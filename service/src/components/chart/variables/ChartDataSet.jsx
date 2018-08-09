const chartDataSet = (graphDataInfo, setCycle, cycleTitle) => {
  const { graphDataList, graphType, baseType, dataType } = graphDataInfo;
  if (graphDataList.length === 0) {
    return 'non Data';
  } else {
    const names =
      graphType.graphSubType.code === 'PIE_GRAPH'
        ? graphDataList.map(info => {
            return info.pieName;
          })
        : [['X: ' + baseType.title], [`Y: ${dataType.title} (단위: 1000)`]];
    const types = ['info', 'danger', 'warning', 'grape', 'grass', 'sea'];

    let tempArr = [];
    let pieLabelArr = [].concat(graphDataList);
    let labelArr = [].concat(graphDataList);

    let newArr = [];
    if (graphDataList.length < 5) {
      for (let i = 0; i < graphDataList.length; i++) {
        newArr.push(labelArr.pop());
      }
    } else {
      for (let i = 0; i < 5; i++) {
        newArr.push(labelArr.pop());
      }
    }

    const labels =
      graphType.graphSubType.code !== 'PIE_GRAPH'
        ? newArr.map((info, index) => {
            tempArr.push(info.dataY);
            // if (info.dataX.indexOf('~') > -1) {
            //   return info.dataX.split(' ~ ')[1].split(' ')[1];
            // } else if (info.dataX.indexOf('AGE') > -1) {
            //   return info.dataX.split('_')[1] + '대';
            // } else if (info.dataX.indexOf('REGION') > -1) {
            //   if (info.dataX.split('_')[1] === '1') {
            //     return '서울';
            //   } else if (info.dataX.split('_')[1] === '2') {
            //     return '인천';
            //   } else if (info.dataX.split('_')[1] === '3') {
            //     return '대구';
            //   } else if (info.dataX.split('_')[1] === '4') {
            //     return '대전';
            //   } else if (info.dataX.split('_')[1] === '5') {
            //     return '부산';
            //   }
            // } else if (info.dataX.indexOf('MALE') > -1) {
            //   return '남성';
            // } else if (info.dataX.indexOf('FEMALE') > -1) {
            //   return '여성';
            // } else {
            return info.dataX;
            // }
          })
        : pieLabelArr.map(info => {
            tempArr.push(info.count);
            return '';
          });

    const series =
      graphType.graphSubType.code === 'BAR_GRAPH'
        ? tempArr.map((arr, index) => {
            let newArr = [];
            for (let j = 0; j < tempArr.length; j++) {
              newArr.push(index === j ? arr : undefined);
            }
            return newArr;
          })
        : tempArr;
    return {
      cycleTime: setCycle,
      minutes: 0,
      data: {
        labels: labels,
        series: series,
      },
      legend: {
        names: names,
        types: types,
      },
      cycleTitle: cycleTitle,
    };
  }
};

module.exports = {
  chartDataSet,
};
