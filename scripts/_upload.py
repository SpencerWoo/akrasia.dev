import os

from _utils import *

# 0)
@log
def clear_ftp_dir(sftp_dir):
    with connection() as sftp:
        with sftp.cd(sftp_dir):
            # sftp.put_r() proper implementation
            _delete_r(sftp, sftp_dir)

# 1)
@log
def upload_compiled_sites(base_dir):
    base_ftp_dir = '/var/www'
    sites = [
        'cyberchef', 
        'k8s', 
        'metaljs', 
        'prng',
        'sennajs', 
        'talon'
    ]

    upload_compiled_dirs(base_dir, base_ftp_dir, sites)

# 2)
@log
def upload_nginx(base_dir):
    ftp_dir = '/etc/nginx/sites-available/'
    nginx_dir = f'{base_dir}/scripts/nginx/'
    upload(ftp_dir, nginx_dir)

def upload_akrasiadev(base_dir):
    # 0)
    # clear_ftp_dir(ftp_dir)
    # print(f'Cleared directory {ftp_dir}')

    # 1)
    upload_compiled_sites(base_dir)

    # 2)
    upload_nginx(base_dir)

if __name__ == '__main__':
    cwd = os.getcwd()

    os.chdir(f'{cwd}/../')
    base_dir = os.getcwd()

    upload_akrasiadev(base_dir);
    # upload_puzzle();