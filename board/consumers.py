import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

class BoardConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = "board"
        self.room_group_name = "drawing_board"
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()
        self.send(text_data=json.dumps({
            'type': 'initialize_board',
            'width': 100,
            'height': 70,
        }))

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        """
        TODO: receive logic
        """
        text_data_json = json.loads(text_data)
        if text_data_json['type'] == 'fill_cell':
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                text_data_json
            )

    def fill_cell(self, event):
        self.send(text_data=json.dumps(event))