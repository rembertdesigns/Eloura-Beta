import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Phone, CheckCircle, Clock, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HelpResponse {
  id: string;
  responder_name: string;
  response_message: string;
  availability: string;
  status: 'offered' | 'accepted' | 'declined';
  created_at: string;
  contact_method: 'message' | 'phone' | 'email';
}

interface ViewResponsesModalProps {
  isOpen: boolean;
  onClose: () => void;
  helpRequest: any;
  responses: HelpResponse[];
  onAcceptResponse: (responseId: string) => void;
  onDeclineResponse: (responseId: string) => void;
  onSendThankYou: (responderId: string, message: string) => void;
}

const ViewResponsesModal: React.FC<ViewResponsesModalProps> = ({
  isOpen,
  onClose,
  helpRequest,
  responses,
  onAcceptResponse,
  onDeclineResponse,
  onSendThankYou
}) => {
  const [thankYouMessage, setThankYouMessage] = useState('');
  const [selectedResponder, setSelectedResponder] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-700';
      case 'declined':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  const handleAcceptResponse = async (responseId: string) => {
    setLoading(true);
    try {
      await onAcceptResponse(responseId);
      toast({
        title: "Response Accepted",
        description: "You've accepted this offer of help"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept response",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeclineResponse = async (responseId: string) => {
    setLoading(true);
    try {
      await onDeclineResponse(responseId);
      toast({
        title: "Response Declined",
        description: "You've declined this offer"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to decline response",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendThankYou = async () => {
    if (!thankYouMessage.trim() || !selectedResponder) return;

    setLoading(true);
    try {
      await onSendThankYou(selectedResponder, thankYouMessage);
      toast({
        title: "Thank You Sent",
        description: "Your thank you message has been sent"
      });
      setThankYouMessage('');
      setSelectedResponder('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send thank you message",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!helpRequest) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Responses to: {helpRequest.title}</DialogTitle>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Badge className="bg-blue-100 text-blue-700">
              {helpRequest.category}
            </Badge>
            <span>•</span>
            <span>{new Date(helpRequest.date).toLocaleDateString()}</span>
            {helpRequest.time && (
              <>
                <span>•</span>
                <span>{helpRequest.time}</span>
              </>
            )}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="space-y-4 p-1">
              {responses.length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No responses yet</h3>
                  <p className="text-gray-600">Your village will be notified and can respond when available</p>
                </div>
              ) : (
                responses.map((response) => (
                  <div key={response.id} className="border rounded-lg p-4 bg-white">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{getInitials(response.responder_name)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{response.responder_name}</h4>
                            <p className="text-sm text-gray-500">
                              {new Date(response.created_at).toLocaleDateString()} at {new Date(response.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                          <Badge className={getStatusColor(response.status)}>
                            {response.status}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-700 mb-3">{response.response_message}</p>
                        
                        {response.availability && (
                          <div className="text-sm text-gray-600 mb-3">
                            <strong>Availability:</strong> {response.availability}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            {response.contact_method === 'phone' && <Phone className="h-4 w-4" />}
                            {response.contact_method === 'message' && <MessageSquare className="h-4 w-4" />}
                            Prefers {response.contact_method}
                          </div>
                          
                          {response.status === 'offered' && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeclineResponse(response.id)}
                                disabled={loading}
                              >
                                Decline
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleAcceptResponse(response.id)}
                                disabled={loading}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Accept
                              </Button>
                            </div>
                          )}
                          
                          {response.status === 'accepted' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedResponder(response.id)}
                              className="text-pink-600 hover:text-pink-700 hover:bg-pink-50"
                            >
                              <Star className="h-4 w-4 mr-1" />
                              Send Thank You
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
              
              {/* Thank You Message Section */}
              {selectedResponder && (
                <div className="border-t pt-6 mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Send a Thank You Note</h4>
                  <div className="space-y-3">
                    <Textarea
                      value={thankYouMessage}
                      onChange={(e) => setThankYouMessage(e.target.value)}
                      placeholder="Express your gratitude..."
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSendThankYou}
                        disabled={loading || !thankYouMessage.trim()}
                        className="bg-pink-600 hover:bg-pink-700"
                      >
                        <Star className="h-4 w-4 mr-2" />
                        Send Thank You
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedResponder('');
                          setThankYouMessage('');
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewResponsesModal;