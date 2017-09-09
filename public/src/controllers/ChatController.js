var PayItForward = angular.module('PayItForward');

PayItForward.controller('ChatController', ['Messages', '$scope', function(Messages, $scope) {

    // Message Inbox
    $scope.messages = [];

    // Receive Messages
    Messages.receive(function(message) {
        $scope.messages.push(message);
    });

    // Send Messages
    $scope.send = function() {
        Messages.send({
            data: $scope.textbox
        });
    };


}]);
