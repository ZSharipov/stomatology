import React from 'react'
import { ServerSrviceConsumer } from '../server-service-contex';

const withServerService = () => (Wrapped) => {
    return (props) => {
        return (
            <ServerSrviceConsumer>
                {
                    (serverService) => {
                      return  <Wrapped {...props}
                        serverService = {serverService}/>
                    }
                }
            </ServerSrviceConsumer>
        )
    }
}

export default withServerService;