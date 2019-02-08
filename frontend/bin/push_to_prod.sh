scp -r build tshur@linux.dc.engr.scu.edu:/webpages/tshur
ssh tshur@linux.dc.engr.scu.edu << EOF
    rm -r /webpages/tshur/static
    mv /webpages/tshur/build/* /webpages/tshur/
EOF