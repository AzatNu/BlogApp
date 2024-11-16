import { server } from "../bff/server";
import { useSelector } from "react-redux";
import { selectUserSession } from "../selectors";
import { useCallback } from "react";
import PropTypes from "prop-types";
export const useServerRequest = () => {
    const session = useSelector(selectUserSession);

    return useCallback(
        (operation, ...params) => {
            const request = [`register`, `authorize`].includes(operation)
                ? params
                : [session, ...params];
            return server[operation](...request);
        },
        [session]
    );
};

useServerRequest.propTypes = {
    operation: PropTypes.string,
    params: PropTypes.array,
};

