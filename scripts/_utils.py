import argparse
import builtins
import os
import pysftp
import time

from contextlib import contextmanager

parser = argparse.ArgumentParser(description='argparse')
parser.add_argument('--server', type=str, default='1.1.1.1')
parser.add_argument('--username', type=str, default='root')
args = parser.parse_args()
server = args.server
username = args.username

dry_run = False
noise = True
key = '~/.ssh/id_rsa'

def print_flush(*objects, sep='', end='\n', flush=False):
    return builtins.print(objects, sep, end, flush=True)

builtins.__print__ = print_flush

def log(f):
    def print_log(*args, **kwargs):
        params = ', '.join([str(arg) for arg in args])

        if noise:
            print(f'Running : {f.__name__}({params})')
        # print(f'{f.__code__.co_varnames}')
       
        ret = f(*args, **kwargs)
        # print(f'\t {ret}')

        if noise:
            print(f'Completed : {f.__name__}({params})')

        return ret

    return print_log

@contextmanager
def connection():
    with pysftp.Connection(server, username=username, private_key=key) as sftp:
        yield sftp
            
def _upload_r(sftp, sftp_dir, local_dir, preserve_mtime=True):
    for file in os.listdir(local_dir):
        # rpath = os.path.join(local_dir, file.filename)
        if _is_directory(local_dir + file):
            if not _is_existing(sftp, f'{sftp_dir}{file}'):                
                if dry_run:
                    print(f'mkdir {file}')
                else:
                    sftp.mkdir(f'{sftp_dir}{file}')

            _upload_r(sftp, f'{sftp_dir}{file}/', f'{local_dir}{file}/')
        else:
            # if not _is_existing(sftp, f'{sftp_dir}{file}'):
            if dry_run:
                print(f'replacing {local_dir}{file} with {sftp_dir}{file}')
            else:
                sftp.put(f'{local_dir}{file}', f'{sftp_dir}{file}')

def _delete_r(sftp, sftp_dir):
    for file in sftp.listdir(sftp_dir):
        rpath = os.path.join(sftp_dir, file)
        if _is_directory(rpath):
            print(f'{rpath} is dir')
            _delete_r(sftp, rpath)
        else:
            rpath = os.path.join(sftp_dir, file)
            print(f'{rpath} is file')
            if dry_run:
                pass
                # print(f'removing {rpath}')
            else:
                sftp.remove(rpath)
    if dry_run:
        print(f'removing {sftp_dir}')
    else:
        sftp.rmdir(sftp_dir)
    # filesInRemoteArtifacts = sftp.listdir(path=remoteArtifactPath)
    # for file in filesInRemoteArtifacts:
    #     sftp.remove(os.path.join(remoteArtifactPath, file))

def _is_directory(filepath):
    return os.path.isdir(filepath)

def _is_existing(sftp, filename):
    return sftp.exists(filename)

def _run_os(cmd):
    if dry_run:
        print(cmd)
    else:
        os.system(cmd)

def upload(sftp_dir, local_dir):
    with connection() as sftp:
        with sftp.cd(sftp_dir):
            # sftp.put_r() proper implementation
            _upload_r(sftp, sftp_dir, local_dir)

    print(f'uploaded {sftp_dir} from {local_dir}')

def upload_compiled_dirs(base_dir, base_ftp_dir, dirs):
    for d in dirs:
        compiled_dir = f'{base_dir}/{d}/'
        ftp_dir = f'{base_ftp_dir}/{d}/'

        # print(ftp_dir, compiled_dir)

        upload(ftp_dir, compiled_dir)
