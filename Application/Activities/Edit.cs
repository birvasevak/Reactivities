using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper __mapper;
            public Handler(DataContext context, IMapper _mapper)
            {
                __mapper = _mapper;
                _context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                // _context.Activities.Update(request.Activity);

                var activity = await _context.Activities.FindAsync(request.Activity.Id);
                __mapper.Map(request.Activity, activity);
                await _context.SaveChangesAsync();
            }
        }
    }
}