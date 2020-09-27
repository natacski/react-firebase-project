import React, { useState, useEffect, useContext } from 'react';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import AuthUserContext from '../Session/context';
import { Table, Button, Form } from 'react-bootstrap';

const HomePage = (props) => {
  const user = useContext(AuthUserContext);
  const [weatherInfo, setWeatherInfo] = useState({});
  const [userProperties, setUserProperties] = useState({});
  const [websiteToAdd, setWebsiteToAdd] = useState('');

  const tableStyle = {
    margin: '20px auto',
    color: 'black',
    backgroundColor: 'white',
    width: '60%',
  };

  useEffect(() => {
    //get the weather and set state
    getUserAndWeatherData();
  }, []);

  useEffect(() => {
    if (userProperties && userProperties.email) {
      setUserInfo();
      getWeatherData(userProperties.zipCode).then((weatherInfo) => {
        setWeatherInfo(weatherInfo);
        console.table(weatherInfo);
      });
    }
  }, [userProperties]);

  /**
   * Gets the initial user data, then retrieves the weather data using the zip code
   */
  const getUserAndWeatherData = () => {
    props.firebase.db
      .ref('users/' + user.uid)
      .once('value', (snap) => {
        let databaseData = snap.val();
        setUserProperties(databaseData);
        let zipCode = databaseData.zipCode;

        getWeatherData(zipCode).then((weatherInfo) => {
          setWeatherInfo(weatherInfo);
          console.table(weatherInfo);
        });
      });
  };

  /**
   * Gets the current weather by zip code
   */
  const getWeatherData = async (zipCode) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=imperial&appid=d8273ff3fb899f65070a8154465cb75d`,
    );
    const weatherData = await response.json();
    return weatherData;
  };

  /**
   * when the userProperties change, we will push the new properties to firebase
   * and get the updated weather
   */
  const handleChangeZip = () => {
    let newZip = prompt('Please Enter New Zip Code ');
    setUserProperties((prevState) => ({
      ...prevState,
      zipCode: newZip,
    }));
  };

  /**
   * updates the user properties in the firebase database
   */
  const setUserInfo = () => {
    props.firebase.db
      .ref('users/' + user.uid)
      .set(userProperties)
      .catch((error) => {
        console.log(error.message);
      });
  };

  const iconUrl =
    weatherInfo.weather &&
    'https://openweathermap.org/img/wn/' +
      weatherInfo.weather[0].icon +
      '@2x.png';

  /**
   * update website list
   */
  const handleWebsiteChange = (e) => {
    setWebsiteToAdd(e.target.value);
  };

  const updateWebsiteList = (newWebsiteList) => {
    let currentWebSiteList = userProperties.websites
      ? Object.assign(userProperties.websites)
      : [];
    currentWebSiteList.push(websiteToAdd);

    setUserProperties((prevState) => ({
      ...prevState,
      websites: currentWebSiteList,
    }));
  };
  /**
   * Delete website from list
   */
  const deleteWebsiteByIndex = (index) => {
    let currentWebSiteList = userProperties.websites
      ? Object.assign(userProperties.websites)
      : [];
    currentWebSiteList.splice(index, 1);

    setUserProperties((prevState) => ({
      ...prevState,
      websites: currentWebSiteList,
    }));
  };

  /**
   * edit website
   */
  const editWebsiteByIndex = (index) => {
    let currentWebSiteList = userProperties.websites
      ? Object.assign(userProperties.websites)
      : [];

    let updatedWebsite = prompt(
      'enter updated site',
      currentWebSiteList[index],
    );

    currentWebSiteList[index] = updatedWebsite;

    setUserProperties((prevState) => ({
      ...prevState,
      websites: currentWebSiteList,
    }));
  };

  return (
    <div>
      <div className="banner">
        <h1>Welcome {userProperties.username}</h1>
      </div>
      <div style={{ margin: 50 }}>
        <Table style={tableStyle} striped bordered hover size="sm">
          <thead>
            <tr>
              <th colSpan={4}>
                <h2>
                  The weather in {weatherInfo.name} (
                  {userProperties.zipCode})
                </h2>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{textAlign: 'center'}}>
                <strong>Description</strong>
              </td>
              <td style={{textAlign: 'center'}}>
                <strong>Icon</strong>
              </td>
              <td style={{textAlign: 'center'}}>
                <strong>Max (Fahrenheit)</strong>
              </td>
              <td style={{textAlign: 'center'}}>
                <strong>Min (Fahrenheit)</strong>
              </td>
            </tr>
            <tr>
              <td>
                <h3>
                  {weatherInfo.weather &&
                    weatherInfo.weather[0].description}
                </h3>
              </td>
              <td>{weatherInfo.weather && <img src={iconUrl} />}</td>
              <td>
                <h3>
                  {weatherInfo.main && weatherInfo.main.temp_max}
                </h3>
              </td>

              <td>
                <h3>
                  {weatherInfo.main && weatherInfo.main.temp_min}
                </h3>
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <Button onClick={() => handleChangeZip()}>
                  Change my Zip
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
        <br></br>

        <br></br>
        <div style={tableStyle}>
          <h2>My favorite websites</h2>
          {!userProperties.websites && (
            <p>
              It looks like you do not have any favorite websites, how
              sad!
            </p>
          )}
          <Form>
            <Form.Group controlId="formWebsite">
              <Form.Control
                type="text"
                placeholder="Enter URL here"
                onChange={handleWebsiteChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={updateWebsiteList}>
              Submit
            </Button>
          </Form>
          <br></br>

          <Table style={tableStyle} striped bordered hover size="sm">
            <thead>
              <tr>
                <th colSpan={3}>URL</th>
              </tr>
            </thead>
            <tbody>
              {userProperties.websites &&
                userProperties.websites.map((url, index) => (
                  <tr key={index}>
                    <td>
                      <a href={url} target="_blank">
                        {url}
                      </a>
                    </td>
                    <td>
                      <Button
                        onClick={() => deleteWebsiteByIndex(index)}
                      >
                        Delete
                      </Button>
                    </td>
                    <td>
                      <Button
                        onClick={() => editWebsiteByIndex(index)}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

const condition = (authUser) => !!authUser;

export default withFirebase(withAuthorization(condition)(HomePage));
