class WxWebSocket {
    constructor(url, protocols) {
        this.url = url;
        this.protocols = typeof protocols === 'string' ? [protocols] : protocols;
        setTimeout(this.initWxWebsocket.bind(this), 0);
    }

    get protocol() {
        return this.protocols ? this.protocols[0] : null;
    }

    initWxWebsocket() {
        this._wxWs = wx.connectSocket({
            url: this.url,
            protocols: this.protocols,
            fail: () => {
                this.readyState = WxWebSocket.CLOSED;
            }
        });

        this.readyState = WxWebSocket.CONNECTING;

        this._wxWs.onOpen(this.makeOnOpen());
        this._wxWs.onClose(this.makeOnClose());
        this._wxWs.onError(this.makeOnError());
        this._wxWs.onMessage(this.makeOnMessage());
    }

    close(code, reason) {
        this.readyState = WxWebSocket.CLOSING;
        this._wxWs.close(code, reason);
    }

    send(data) {
        this._wxWs.send({data});
    }

    makeOnOpen() {
        return () => {
            console.log(`WebSocket connection opened for ${this.url}`);
            this.readyState = WxWebSocket.OPEN;
            this.onopen && this.onopen.apply(null, arguments);
        }
    }

    makeOnClose() {
        return (status) => {
            console.log(`WebSocket closed with result ${JSON.stringify(status)}`);
            this.readyState = WxWebSocket.CLOSED;
            this.onclose && this.onlose.apply(null, arguments);
        }
    }

    makeOnError() {
        return (err) => {
            console.error(err);
            this.onerror && this.onerror.apply(null, arguments);
        }
    }

    makeOnMessage() {
        return this.onmessage;
    }
}

WxWebSocket.OPEN = 1;
WxWebSocket.CLOSED = 3;
WxWebSocket.CLOSING = 2;
WxWebSocket.CONNECTING = 0;

module.exports = WxWebSocket;
