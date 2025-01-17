import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  DataContainer: {
    flex: 1,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  DataContainerWrapper: {
    display: "flex",
    flexDirection: "row",
  },
}));
