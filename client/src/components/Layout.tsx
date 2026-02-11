import { Grid, GridItem } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import DNavbar from "./DNavbar";

const Layout = () => {
    return (
        <Grid
            templateAreas={`
                "aside nav"
                "aside content"
                `}
                templateColumns={{md:"250px 1fr", lg:"280px 1fr"}}
                templateRows="auto 1fr"
        >
            <GridItem area="nav">
                <DNavbar />
            </GridItem>
            <GridItem area="aside">
                <Sidebar />
            </GridItem>
            <GridItem area="content">
                <Outlet />
            </GridItem>
        </Grid>
    );
};
export default Layout;
//gridTemplateColumns={{base: "60px 1fr", md:"260px 1fr",}} gridTemplateRows={3}
