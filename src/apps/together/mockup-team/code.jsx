var Activity = React.createClass({
    componentWillMount: function() {
        var ref = new Firebase('https://glowing-heat-5994.firebaseio.com/');
        ref.child('history').on("value", function(snapshot){
            var vals = snapshot.val();
            var arr = [];
            for (var key in vals) {
                if (!vals.hasOwnProperty(key)) {
                    continue;
                }
                arr.push(vals[key]);
            }
            arr = arr.splice(Math.max(arr.length - 10, 0));
            this.setState({recent: arr});
        }.bind(this));
        ref.child('users').on('value', function(snapshot){
            this.setState({users: snapshot.val()})
        }.bind(this))
    },

    getInitialState: function() {
        return({recent: [],
                users: {}})
    },

    render: function() {
        const elems = this.state.recent.map(function(val, key){
            const author = val.a
            const u = this.state.users[author]
            var color = ""
            if (u) {
                color = u.color
            }
            const char = JSON.stringify(val.o[1])
            return (<div key={key} className="row" style={{marginBottom: "0px"}}>
                <div className="col s8">Author: <span style={{color: color}}>{author.split("-")[1]}</span></div>
                <div className="col s4">Action: {char}</div>
            </div>)
        }.bind(this));
        return (
            <div>
            {elems}
            </div>
        )
    }
});

ReactDOM.render(<Activity/>, document.getElementById('contributions'));
