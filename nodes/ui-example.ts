interface NodeRedConfig {
    group: string;
    [key: string]: any;
}

interface NodeRedNode {
    id: string;
    send: (msg: any) => void;
    error: (message: string) => void;
}

interface NodeRedGroup {
    getBase(): any;
    register(node: NodeRedNode, config: NodeRedConfig, evts: any): void;
}

interface NodeRED {
    nodes: {
        createNode(node: NodeRedNode, config: NodeRedConfig): void;
        getNode(id: string): NodeRedGroup | null;
        registerType(type: string, constructor: any): void;
    };
}

interface Message {
    ui_update?: {
        example?: any;
        [key: string]: any;
    };
    [key: string]: any;
}

interface Connection {
    id: string;
}

module.exports = function (RED: NodeRED) {
  function UIExampleNode (this: NodeRedNode, config: NodeRedConfig) {
    RED.nodes.createNode(this, config)

    const node = this

    // which group are we rendering this widget
    const group = RED.nodes.getNode(config.group)

    const base = group?.getBase()

    // server-side event handlers
    const evts = {
      onAction: true,
      beforeSend: function (msg: Message): Message {
        // check for any dynamic properties being set
        const updates = msg.ui_update
        if (updates) {
          if (typeof updates.example !== 'undefined') {
            // save the "example" property in the Node-RED statestore
            base?.stores?.state?.set(base, node, msg, 'example', updates.example)
          }
        }
        return msg
      },
      onInput: function (msg: Message, send: (msg: Message) => void, _done: () => void) {
        // store the latest value in our Node-RED datastore
        base?.stores?.data?.save(base, node, msg)
        // send it to any connected nodes in Node-RED
        send(msg)
      },
      onSocket: {
        'my-custom-event': function (conn: Connection, id: string, msg: Message) {
          console.info('"my-custom-event" received:', conn.id, id, msg)
          console.info('conn.id:', conn.id)
          console.info('id:', id)
          console.info('msg:', msg)
          console.info('node.id:', node.id)
          // emit a msg in Node-RED from this node
          node.send(msg)
        }
      }
    }

    // inform the dashboard UI that we are adding this node
    if (group) {
      group.register(node, config, evts)
    } else {
      node.error('No group configured')
    }
  }

  RED.nodes.registerType('ui-example', UIExampleNode)
}
