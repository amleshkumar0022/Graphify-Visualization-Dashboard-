import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const [dataindiv, setdataindiv] = useState({});
  const [value, setvalue] = useState("");
  const [Count, setCount] = useState("");
  const [condition, setCondition] = useState(false);
  const [Variables, setVariables] = useState("");
  const [isChecked, setCheckboxes] = useState({
    intensity: false,
    likelihood: false,
    relevance: false,
    year: false,
    country: false,
    topics: false,
    region: false,
    city: false,
  });

  const [filters, setFilters] = useState({
    end_year: "",
    topic: "",
    sector: "",
    region: "",
    pest: "",
    source: "",
    swot: "",
    country: ""
  });

  const [barChart, setBarChart] = useState(null);

  function func(e) {
    const name = e.target.name;
    setCheckboxes(prevState => ({
      ...prevState,
      [name]: !prevState[name]
    }));

    if (e.target.checked === true) {
      setVariables(name);
    }
    else {
      setVariables("");
    }
  }

  function filtershandle(e) {
    const name = e.target.name;
    setFilters({ ...filters, [name]: e.target.value })
  }

  const getData = async (e) => {
    if (Variables !== "") {
      e.preventDefault();
      const obj = {
        var1: `${Variables}`
      };
      for (let key in filters) {
        if (filters[key] !== "") {
          obj[key] = filters[key];
        }
      }
      console.log(obj)
      const resp = await fetch("http://localhost:3000/users/api/details", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      if (resp.ok) {
        let data3 = await resp.json();
        console.log(data3);
        setdataindiv(data3);

        const labels = Object.keys(data3).map(label => String(label));
        const data = Object.values(data3);


        if (barChart !== null) {
          barChart.destroy();
          //setdataindiv({});
          setCondition(false);
          setCount("");
          setvalue("");
        }


        const ctx = document.getElementById('barChart');
        const newChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Count',
              backgroundColor: 'rgba(75, 192, 192, 1)',
              borderColor: 'rgba(0, 0, 0, 1)',
              borderWidth: 2,
              data: data
            }]
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: `${Variables} graph with filters`
              },
              scales: {
                x: {
                  type: 'category',
                  scaleLabel: {
                    display: true,
                    labelString: 'X-Axis'
                  }
                },
                y: {
                  type: 'linear',
                  scaleLabel: {
                    display: true,
                    labelString: 'Y-Axi'
                  }
                }
              }
            }
          }
        });
        setBarChart(newChart);
        setCondition(true);
        setvalue("value");
        setCount("Count");
      }
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '20px', height: '100vh' }}>
      <div style={{ width: '25%', backgroundColor: '#fff', border: '2px solid #000', borderRadius: '10px', padding: '20px' }}>
        <h2 style={{ marginBottom: '10px', color: '#007bff' }}>Variables to be visualized</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '10px' }}>
            <input type="checkbox" id="Intensity" name="intensity" checked={isChecked.intensity} onChange={func} />
            <label htmlFor="Intensity" style={{ marginLeft: '5px', color: '#007bff', fontWeight: 'bold' }}>Intensity</label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input type="checkbox" id="Likelihood" name="likelihood" checked={isChecked.likelihood} onChange={func} />
            <label htmlFor="Likelihood" style={{ marginLeft: '5px', color: '#007bff', fontWeight: 'bold' }}>Likelihood</label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input type="checkbox" id="Relevance" name="relevance" checked={isChecked.relevance} onChange={func} />
            <label htmlFor="Relevance" style={{ marginLeft: '5px', color: '#007bff', fontWeight: 'bold' }}>Relevance</label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input type="checkbox" id="Year" name="year" checked={isChecked.year} onChange={func} />
            <label htmlFor="Year" style={{ marginLeft: '5px', color: '#007bff', fontWeight: 'bold' }}>Year</label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input type="checkbox" id="Country" name="country" checked={isChecked.country} onChange={func} />
            <label htmlFor="Country" style={{ marginLeft: '5px', color: '#007bff', fontWeight: 'bold' }}>Country</label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input type="checkbox" id="Topics" name="topics" checked={isChecked.topics} onChange={func} />
            <label htmlFor="Topics" style={{ marginLeft: '5px', color: '#007bff', fontWeight: 'bold' }}>Topics</label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input type="checkbox" id="Region" name="region" checked={isChecked.region} onChange={func} />
            <label htmlFor="Region" style={{ marginLeft: '5px', color: '#007bff', fontWeight: 'bold' }}>Region</label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input type="checkbox" id="City" name="city" checked={isChecked.city} onChange={func} />
            <label htmlFor="City" style={{ marginLeft: '5px', color: '#007bff', fontWeight: 'bold' }}>City</label>
          </div>
        </div>
      </div>
      <div style={{ width: '72%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '50%' }}>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="Year" style={{ marginRight: '10px' }}>End_Year :</label>
                <input type="input" id="filter1" value={filters.end_year} name="end_year" onChange={filtershandle} style={{ border: '2px solid #000', borderRadius: '10px', padding: '5px' }} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="Topics" style={{ marginRight: '28px' }}>Topics :</label>
                <input type="input" id="filter2" value={filters.topic} name="topic" onChange={filtershandle} style={{ border: '2px solid #000', borderRadius: '10px', padding: '5px' }} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="Sector" style={{ marginRight: '28px' }}>Sector :</label>
                <input type="input" id="filter3" value={filters.sector} name="sector" onChange={filtershandle} style={{ border: '2px solid #000', borderRadius: '10px', padding: '5px' }} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="Region" style={{ marginRight: '26px' }}>Region :</label>
                <input type="input" id="filter4" value={filters.region} name="region" onChange={filtershandle} style={{ border: '2px solid #000', borderRadius: '10px', padding: '5px' }} />
              </div>
            </div>
            <div style={{ width: '50%' }}>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="Pest" style={{ marginRight: '36px' }}>Pest :</label>
                <input type="input" id="filter5" value={filters.pest} name="pest" onChange={filtershandle} style={{ border: '2px solid #000', borderRadius: '10px', padding: '5px' }} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="Source" style={{ marginRight: '18px' }}>Source :</label>
                <input type="input" id="filter6" value={filters.source} name="source" onChange={filtershandle} style={{ border: '2px solid #000', borderRadius: '10px', padding: '5px' }} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="Swot" style={{ marginRight: '30px' }}>Swot :</label>
                <input type="input" id="filter7" value={filters.swot} name="swot" onChange={filtershandle} style={{ border: '2px solid #000', borderRadius: '10px', padding: '5px' }} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="Country" style={{ marginRight: '10px' }}>Country :</label>
                <input type="input" id="filter8" value={filters.country} name="country" onChange={filtershandle} style={{ border: '2px solid #000', borderRadius: '10px', padding: '5px' }} />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={getData} style={{ backgroundColor: '#007bff', color: '#fff', fontWeight: 'bold', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', border: 'none' }}>Apply Filters</button>
          </div>
        </div>
        <div style={{ display: 'flex', width: '100%', height: '400px', backgroundColor: '#fff', borderRadius: '10px', border: '2px solid #000' }}>
          {!condition && (
            <h2 style={{
              marginBottom: '10px',
              color: '#007bff',
              textDecoration: 'underline',

              fontSize: '15px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              Click on "Add Filter" button to display the graph
            </h2>
          )}

          <div style={{ flex: 1 }}>
            <canvas id="barChart" width="400" height="400"></canvas>
          </div>
          <div style={{ flex: 1, padding: '20px', backgroundColor: '#f2f2f2', borderRadius: '0 10px 10px 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, padding: '20px', backgroundColor: '#f2f2f2', borderRadius: '0 10px 10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ overflowX: 'auto', marginBottom: '10px', textAlign: 'center' }}>
                {condition && <h2 style={{ marginBottom: '10px', color: '#007bff', textDecoration: 'underline', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontSize: '22px' }}>{Variables} information</h2>}


                <table style={{ margin: 'auto', borderCollapse: 'collapse', border: '2px solid #000', borderRadius: '10px' }}>
                  <tbody>
                    {condition && <tr style={{ borderBottom: '1px solid #000', backgroundColor: '#007bff', color: '#fff' }}>
                      <td style={{ padding: '10px', fontWeight: 'bold', borderRight: '1px solid #fff' }}>{Variables} Value</td>
                      <td style={{ padding: '10px', fontWeight: 'bold', borderRight: '1px solid #fff' }}>Count</td>
                    </tr>}
                    {Object.keys(dataindiv).map((key, index) => (
                      <tr key={key} style={{ borderBottom: '1px solid #000', backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#fff' }}>
                        <td style={{ padding: '10px', fontWeight: 'normal', borderRight: '1px solid #000' }}>{key}</td>
                        <td style={{ padding: '10px', fontWeight: 'normal' }}>{dataindiv[key]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>


              </div>
            </div>
          </div>


        </div>

      </div>
    </div>
  );
}

export default Dashboard;
