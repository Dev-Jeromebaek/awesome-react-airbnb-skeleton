import React, { Fragment } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import { Button } from 'reactstrap';

import DrawChart from '../components/chart/draw/DrawChart';
import { ErrorPage } from '../pages';

import { withContext } from '../Store';
import {
  setGridLayout,
  initGrid,
} from '../components/chart/variables/ChartLayoutSet';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class DashboardGraphSection extends React.PureComponent {
  state = {
    layouts: {},
    dashboardOne: [],
    isReSized: false,
    isLoadData: false,
    isError: false,
    errorCode: '',
    errorText: '',
  };

  async componentDidMount() {
    initGrid();
    try {
      const dashboardOne = await this.props.value.actions.getDashboardOne(
        this.props.dashboardId,
      );
      this.setState({
        isError: false,
        dashboardOne: dashboardOne.data,
        isLoadData: true,
        layouts: this.originalLayouts(this.props.dashboardId),
      });
    } catch (error) {
      this.setState({
        isError: true,
        errorCode: error.response.status,
        errorText: error.response.statusText,
      });
    }
  }

  async componentWillReceiveProps(nextProps) {
    initGrid();
    try {
      if (this.props.dashboardId !== nextProps.dashboardId) {
        const dashboardOne = await this.props.value.actions.getDashboardOne(
          nextProps.dashboardId,
        );
        this.setState({
          isError: false,
          dashboardOne: dashboardOne.data,
          isLoadData: true,
          layouts: this.originalLayouts(nextProps.dashboardId),
        });
      }
    } catch (error) {
      this.setState({
        isError: true,
        errorCode: error.response.status,
        errorText: error.response.statusText,
      });
    }
  }

  originalLayouts = dashboardId => {
    initGrid();
    return (
      this.props.value.actions.getFromLocalStorage(
        `userLayout-${this.props.dashboardId}`,
      ) || {}
    );
  };

  createChartList = id => {
    initGrid();

    // 1개의 dashboard에 포함된 graphCollectionList 정보(배열)
    if (this.state.dashboardOne.length !== 0 && this.state.isLoadData) {
      const { graphCollectionList } = this.state.dashboardOne.data;
      const chartList = graphCollectionList.map(ct_info => {
        return (
          <div
            className="bg-white"
            key={ct_info.collectionId}
            data-grid={setGridLayout(ct_info)}
          >
            <DrawChart
              dashboardId={this.props.dashboardId}
              graphId={ct_info.graphId}
              key={ct_info.collectionId}
              layouts={this.state.layouts}
            />
          </div>
        );
      });
      return chartList;
    }
  };

  resetLayout = () => {
    initGrid();
    this.setState({ layouts: {} });
  };

  onLayoutChange = (layout, layouts) => {
    initGrid();
    this.props.value.actions.saveToLocalStorage(
      `userLayout-${this.props.dashboardId}`,
      layouts,
    );
    this.setState({ layouts: layouts });
  };

  render() {
    const { isLoadData, isError, errorCode, errorText } = this.state;
    return isError ? (
      <ErrorPage errorCode={errorCode} errorText={errorText} />
    ) : (
      isLoadData && (
        <Fragment>
          <Button
            size="sm"
            outline
            className="my-3 float-right"
            onClick={() => this.resetLayout()}
          >
            Reset Layout
          </Button>
          <div className="clearfix" />
          <div className="bg-light ">
            <ResponsiveReactGridLayout
              className="layout"
              cols={{ lg: 3, md: 3, sm: 3, xs: 1, xxs: 1 }}
              rowHeight={400}
              layouts={this.state.layouts}
              onLayoutChange={(layout, layouts) =>
                this.onLayoutChange(layout, layouts)
              }
            >
              {this.createChartList(this.props.dashboardId)}
            </ResponsiveReactGridLayout>
          </div>
        </Fragment>
      )
    );
  }
}

export default withContext(DashboardGraphSection);
