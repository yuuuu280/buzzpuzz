FROM public.ecr.aws/lambda/python:3.9
RUN yum -y install gcc python3-devel
RUN python3.9 -m pip install --no-cache-dir diffusers transformers scipy torch --extra-index-url https://download.pytorch.org/whl/cpu accelerate boto3

RUN python3.9 -m pip install --no-cache-dir pydantic 

RUN yum install -y \
        mesa-libGL-devel \
        mesa-libGLU-devel \
        libpng-devel && \
    yum clean all

RUN mkdir model

# COPY ./models/anything ./model
COPY ./src ./

CMD ["app.lambda_handler"]