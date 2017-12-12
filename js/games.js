/*global CFBPicks _config*/

var CFBPicks = window.CFBPicks || {};

( function gamesScopeWrapper( $ ) {
    var authToken;

    CFBPicks.authToken.then( function setAuthToken( token ) {
        if ( token ) {
            authToken = token;
        } else {
//            window.location.href = 'signin.html';
        }
    } ).catch( function handleTokenError( error ) {
        alert( error );
//        window.location.href = 'signin.html';
    } );

    function addGame() {
        $.ajax( {
            method: 'POST',
            url: _config.api.invokeUrl + '/addnewgame',
            headers: {
                Authorization: authToken
            },
            data: JSON.stringify( {
                TestData: {
                    Cat: 10,
                    Dog: "hello"
                }
            } ),
            contentType: 'application/json',
            success: completeRequest,
            error: function ajaxError( jqXHR, textStatus, errorThrown ) {
                console.error( 'Error adding new game: ', textStatus, ', Details: ', errorThrown );
                console.error( 'Response: ', jqXHR.responseText );
                alert( 'An error occured when adding a new game:\n' + jqXHR.responseText );
            }
        } );
    }

    function completeRequest( result ) {
        console.log( 'Response received from API: ', result );
        alert( "All done!" );
    }

    // Register click handler for #request button
    $( function onDocReady(  ) {
        $( '#add-game' ).click( addGame );

        if ( !_config.api.invokeUrl ) {
            alert( "No invoke URL" );
        }
    } );

}( jQuery ) );
