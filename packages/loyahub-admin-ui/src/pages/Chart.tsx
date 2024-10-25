import Breadcrumb from '../components/Breadcrumb.js';
import ChartFour from '../components/ChartFour.js';
import ChartOne from '../components/ChartOne.js';
import ChartThree from '../components/ChartThree.js';
import ChartTwo from '../components/ChartTwo.js';

const Chart = () => {
  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12">
          <ChartFour />
        </div>
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>
    </>
  );
};

export default Chart;
