import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PageHome from './components/PageHome';
import PagePoseNet from './components/PageModelPosenet';
import PageMobilenet from './components/PageModelMobilenet';
import PageCocoCam from './components/PageModelCocoCam';
import PageModelFace from './components/PageModelFace';
import PageModelTalk from './components/PageModelTalk';
import PageModelRegression from './components/PageModelRegression';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`
    };
}

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={event => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    }
}));

const getContent = index => {
    switch (index) {
        case 1:
            return <PagePoseNet />;

        case 3:
            return <PageCocoCam />;

        case 2:
            return <PageModelFace />;

        case 5:
            return <PageModelRegression />;

        case 4:
            return <PageMobilenet />;

        case 6:
            return <PageModelTalk />;

        default:
        case 0:
            return <PageHome />;
    }
};

export default function NavTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const content = getContent(value);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="nav tabs example">
                    <LinkTab label="Forside" href="/" {...a11yProps(0)} />
                    <LinkTab label="Pose" href="/pose" {...a11yProps(1)} />
                    <LinkTab label="Face" href="/mood" {...a11yProps(2)} />
                    <LinkTab label="Things Cam" href="/face" {...a11yProps(3)} />
                    <LinkTab label="Things" href="/things" {...a11yProps(4)} />
                    <LinkTab label="Train" href="/train" {...a11yProps(5)} />
                    <LinkTab label="Talk" href="/talk" {...a11yProps(6)} />
                    <LinkTab label="Reply" href="/reply" {...a11yProps(7)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={value}>
                {content}
            </TabPanel>
        </div>
    );
}
