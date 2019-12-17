import React from 'react'
import { ServereSrviceContexConsumer } from './server-service-contex';

const withServerService = () => (Wrapped) => {
    return (props) => {
        return (
            <ServereSrviceContexConsumer>
                {
                    (serverService) => {
                        <Wrapped {...props}
                        serverService = {serverService}/>
                    }
                }
            </ServereSrviceContexConsumer>
        )
    }
}

export default withServerService;